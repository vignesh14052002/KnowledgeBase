from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.api.v1.models.chat_with_knowledge_base import (
    GetAnwerRequest,
    GetAnwerResponse,
)

router = APIRouter()


@router.post(
    "/get-answer", response_model=GetAnwerResponse, tags=["Chat with Knowledge Base"]
)
async def get_answer(request: GetAnwerRequest):
    return GetAnwerResponse(
        answer=f"This is the answer from the knowledge base for the question: {request.question}"
    )
