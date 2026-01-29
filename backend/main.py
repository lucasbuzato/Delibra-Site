from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.app import router as chat_router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://seu-projeto.vercel.app",  # depois você troca pelo domínio real
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
