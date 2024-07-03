from app.llm.gemini import get_gemini_llm
from app.prompts.chat_with_knowledge_base import (
    answer_from_knowledge_base_prompt_template,
)


def get_answer(question: str) -> str:
    """Get answer from the knowledge base."""
    gemini = get_gemini_llm("gemini-pro")
    prompt = answer_from_knowledge_base_prompt_template.format(question=question)
    response = gemini.invoke(prompt)
    return response.content
