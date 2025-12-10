from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.api.chat import router as chat_router

app = FastAPI(
    title="CV Chatbot API",
    description="Bu API kullanıcıya sadece CV bilgilerini anlatır.",
    version="1.0.0"
)

# API router
app.include_router(chat_router, prefix="/api")

# Statik dosyaları (CSS, JS) sunmak için
app.mount("/static", StaticFiles(directory="static"), name="static")

# HTML şablonları
templates = Jinja2Templates(directory="templates")

# Ana sayfa route'u (frontend)
@app.get("/", response_class=HTMLResponse)
async def get_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
