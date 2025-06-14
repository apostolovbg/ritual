from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.core.database import Base
from app.core.deps import get_db
from app.core.config import settings

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_events.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def test_event_and_booking_flow():
    # register club
    resp_club = client.post("/register", json={"email": "club@example.com", "password": "pass", "role": "club"})
    assert resp_club.status_code == 200
    # register artist
    resp_artist = client.post("/register", json={"email": "artist@example.com", "password": "pass", "role": "artist"})
    assert resp_artist.status_code == 200
    # club login
    token_club = client.post("/login", data={"username": "club@example.com", "password": "pass"}).json()["access_token"]
    headers_club = {"Authorization": f"Bearer {token_club}"}
    # create event
    event_resp = client.post("/events", json={"title": "Gig"}, headers=headers_club)
    assert event_resp.status_code == 200
    event_id = event_resp.json()["id"]
    # artist login
    token_artist = client.post("/login", data={"username": "artist@example.com", "password": "pass"}).json()["access_token"]
    headers_artist = {"Authorization": f"Bearer {token_artist}"}
    # create booking
    booking_resp = client.post("/bookings", json={"club_id": resp_club.json()["id"], "event_id": event_id}, headers=headers_artist)
    assert booking_resp.status_code == 200
    # artist fetch bookings
    my_bookings = client.get("/my-bookings", headers=headers_artist)
    assert my_bookings.status_code == 200
    assert len(my_bookings.json()) == 1
