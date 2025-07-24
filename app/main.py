from fastapi import FastAPI
from .users.routes import router as users_router
from .events.routes import router as events_router

app = FastAPI(title="RITUAL API")

app.include_router(users_router)
app.include_router(events_router)
