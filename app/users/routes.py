from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import timedelta

from . import schemas, models, crud
from ..core import deps, security, config

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


def authenticate_user(db: Session, email: str, password: str):
    user = crud.get_user_by_email(db, email)
    if not user or not security.verify_password(password, user.hashed_password):
        return None
    return user


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(deps.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.settings.secret_key, algorithms=[config.settings.algorithm])
        user_id: int = int(payload.get("sub"))
    except (JWTError, ValueError):
        raise credentials_exception
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user


@router.post("/register", response_model=schemas.UserRead)
def register(user_in: schemas.UserCreate, db: Session = Depends(deps.get_db)):
    if crud.get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    user = crud.create_user(db, user_in)
    return user


@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(deps.get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=config.settings.access_token_expire_minutes)
    access_token = security.create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token)


@router.get("/me", response_model=schemas.UserRead)
def read_me(current_user: models.User = Depends(get_current_user)):
    return current_user


@router.put("/me/profile", response_model=schemas.UserRead)
def update_profile(
    profile_in: schemas.ProfileUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role == "artist" and current_user.artist_profile:
        for field, value in profile_in.dict(exclude_unset=True).items():
            if hasattr(current_user.artist_profile, field):
                setattr(current_user.artist_profile, field, value)
    if current_user.role == "club" and current_user.club_profile:
        for field, value in profile_in.dict(exclude_unset=True).items():
            if hasattr(current_user.club_profile, field):
                setattr(current_user.club_profile, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user
