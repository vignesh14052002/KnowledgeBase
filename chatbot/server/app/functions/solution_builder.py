from app.llm.gemini import get_gemini_llm
from app.prompts.solution_builder import ask_question_prompt_template
import json
from app.api.v1.models.solution_builder import Message, SolutionBuilderResponse


def decode_response(response: str) -> SolutionBuilderResponse:
    remove_markdown = ["json"]
    for mark in remove_markdown:
        response = response.lstrip(f"```{mark}\n").rstrip(f"\n```")
    return SolutionBuilderResponse(**json.loads(response))


def format_history(history: list[Message]) -> str:
    result = ""
    for message in history:
        result += f"""
You:
    question: {message.question}
    choices: {message.choices}
User:
    answer: {message.answer}
"""
    return result


def get_question(architecture: str, history: list[Message]) -> SolutionBuilderResponse:
    """Get question from the solution builder."""
    gemini = get_gemini_llm("gemini-pro")
    prompt = ask_question_prompt_template.format(
        architecture=architecture, history=format_history(history)
    )
    response = gemini.invoke(prompt)
    return decode_response(response.content)
