from fastapi import FastAPI
from .users.routes import router as users_router

app = FastAPI(title="RITUAL API")

app.include_router(users_router)
