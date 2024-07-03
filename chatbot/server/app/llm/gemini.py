from app.config import settings
from langchain_google_genai import ChatGoogleGenerativeAI


def get_gemini_llm(model_name):
    return ChatGoogleGenerativeAI(
        model=model_name, google_api_key=settings.GEMINI_API_KEY
    )
