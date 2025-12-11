from supabase import create_client
import os

class SupabaseService:
    def __init__(self):
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY")

        self.supabase = create_client(url, key)

    def log_interaction(self, user_message: str, bot_reply: str):
        data = {
            "user_message": user_message,
            "bot_reply": bot_reply
        }
        return self.supabase.table("interactions").insert(data).execute()
