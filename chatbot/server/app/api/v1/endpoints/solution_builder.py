from fastapi import APIRouter
from app.api.v1.models.solution_builder import (
    SolutionBuilderRequest,
    SolutionBuilderResponse,
)

from app.functions import solution_builder

router = APIRouter()


@router.post(
    "/get-question", response_model=SolutionBuilderResponse, tags=["Solution Builder"]
)
def get_question(request: SolutionBuilderRequest):
    return solution_builder.get_question(request.architecture, request.history)
