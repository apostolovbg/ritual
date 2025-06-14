from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from ..core.database import Base
from ..users.models import User

class Event(Base):
    """Event organized by a club."""
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    club_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    location = Column(String, default="")
    genres = Column(String, default="")

    club = relationship(User)

class Booking(Base):
    """Booking request from an artist to a club for an event."""
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    artist_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    club_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    event_id = Column(Integer, ForeignKey("events.id"))
    status = Column(String, default="pending")

    artist = relationship(User, foreign_keys=[artist_id])
    club = relationship(User, foreign_keys=[club_id])
    event = relationship(Event)
