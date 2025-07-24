from sqlalchemy.orm import Session
from . import models, schemas
from ..core.security import get_password_hash


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user_in: schemas.UserCreate) -> models.User:
    hashed_password = get_password_hash(user_in.password)
    user = models.User(email=user_in.email, hashed_password=hashed_password, role=user_in.role)
    db.add(user)
    if user_in.role == "artist":
        db.add(models.ArtistProfile(user=user))
    elif user_in.role == "club":
        db.add(models.ClubProfile(user=user))
    db.commit()
    db.refresh(user)
    return user
