from sqlalchemy.orm import Session
from . import models, schemas


def create_event(db: Session, club_id: int, event_in: schemas.EventCreate) -> models.Event:
    event = models.Event(club_id=club_id, **event_in.dict())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def get_event(db: Session, event_id: int) -> models.Event | None:
    return db.query(models.Event).filter(models.Event.id == event_id).first()


def list_events(db: Session) -> list[models.Event]:
    return db.query(models.Event).all()


def create_booking(db: Session, artist_id: int, booking_in: schemas.BookingCreate) -> models.Booking:
    booking = models.Booking(artist_id=artist_id, **booking_in.dict())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


def get_bookings_for_user(db: Session, user_id: int, role: str) -> list[models.Booking]:
    if role == "artist":
        return db.query(models.Booking).filter(models.Booking.artist_id == user_id).all()
    if role == "club":
        return db.query(models.Booking).filter(models.Booking.club_id == user_id).all()
    return []
