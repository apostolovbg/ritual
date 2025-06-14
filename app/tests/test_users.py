import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.core.database import Base
from app.core.deps import get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def test_register_and_login():
    response = client.post(
        "/register",
        json={"email": "user@example.com", "password": "pass", "role": "artist"}
    )
    assert response.status_code == 200
    token_resp = client.post(
        "/login",
        data={"username": "user@example.com", "password": "pass"}
    )
    assert token_resp.status_code == 200
    token = token_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    me = client.get("/me", headers=headers)
    assert me.status_code == 200
    assert me.json()["email"] == "user@example.com"
