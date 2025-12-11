from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.llm_service import LLMService
from app.services.supabase_service import SupabaseService

router = APIRouter()
llm = LLMService()
supabase = SupabaseService()

WELCOME_MESSAGE = (
    "Merhaba! Ben Ozan. Sana CV'mle ilgili bilgiler verebilirim. "
    "Merak ettiklerini sorabilirsin!"
)

@router.post("/chat", response_model=ChatResponse)
def chat_with_bot(request: ChatRequest):

    user_message = request.message.strip()

    if user_message == "__start__":
        return ChatResponse(reply=WELCOME_MESSAGE)

    reply = llm.chat(user_message)

    supabase.log_interaction(user_message, reply)

    return ChatResponse(reply=reply)
