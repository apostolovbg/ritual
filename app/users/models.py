from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from ..core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    artist_profile = relationship("ArtistProfile", back_populates="user", uselist=False)
    club_profile = relationship("ClubProfile", back_populates="user", uselist=False)

class ArtistProfile(Base):
    __tablename__ = "artist_profiles"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    bio = Column(String, default="")
    genres = Column(String, default="")
    social_links = Column(String, default="")

    user = relationship("User", back_populates="artist_profile")

class ClubProfile(Base):
    __tablename__ = "club_profiles"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    location = Column(String, default="")
    capacity = Column(Integer, default=0)
    about = Column(String, default="")

    user = relationship("User", back_populates="club_profile")
