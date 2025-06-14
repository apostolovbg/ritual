from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ProfileUpdate(BaseModel):
    bio: Optional[str] = None
    genres: Optional[str] = None
    social_links: Optional[str] = None
    location: Optional[str] = None
    capacity: Optional[int] = None
    about: Optional[str] = None
