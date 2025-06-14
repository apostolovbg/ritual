from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..core import deps
from ..users.routes import get_current_user
from ..users.models import User
from . import schemas, crud

router = APIRouter()

@router.post("/events", response_model=schemas.EventRead)
def create_event(
    event_in: schemas.EventCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "club":
        raise HTTPException(status_code=403, detail="Only clubs can create events")
    return crud.create_event(db, current_user.id, event_in)


@router.get("/events", response_model=list[schemas.EventRead])
def list_events(db: Session = Depends(deps.get_db)):
    return crud.list_events(db)


@router.get("/events/{event_id}", response_model=schemas.EventRead)
def read_event(event_id: int, db: Session = Depends(deps.get_db)):
    event = crud.get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.post("/bookings", response_model=schemas.BookingRead)
def create_booking(
    booking_in: schemas.BookingCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "artist":
        raise HTTPException(status_code=403, detail="Only artists can request bookings")
    return crud.create_booking(db, current_user.id, booking_in)


@router.get("/my-bookings", response_model=list[schemas.BookingRead])
def my_bookings(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
):
    return crud.get_bookings_for_user(db, current_user.id, current_user.role)
