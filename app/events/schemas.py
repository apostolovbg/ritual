from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class EventBase(BaseModel):
    title: str
    date: Optional[datetime] = None
    location: Optional[str] = None
    genres: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventRead(EventBase):
    id: int
    club_id: int

    class Config:
        orm_mode = True

class BookingBase(BaseModel):
    event_id: Optional[int] = None

class BookingCreate(BookingBase):
    club_id: int

class BookingRead(BookingBase):
    id: int
    artist_id: int
    club_id: int
    status: str

    class Config:
        orm_mode = True
