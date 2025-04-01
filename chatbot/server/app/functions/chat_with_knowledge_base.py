from app.llm.gemini import get_gemini_llm
from app.prompts.chat_with_knowledge_base import (
    answer_from_knowledge_base_prompt_template,conversation_title_prompt_template
)
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from typing import Any

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001", google_api_key=os.getenv("GEMINI_API_KEY")
)

current_dir = os.path.dirname(os.path.realpath(__file__))
root_path = os.path.abspath(os.path.join(current_dir, "../../../../"))
embeddings_path = os.path.abspath(os.path.join(root_path, "embeddings"))
index = FAISS.load_local(
    embeddings_path, embeddings, allow_dangerous_deserialization=True
)
retriever = index.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={"k": 5, "score_threshold": 0.5},
)


def format_nodes(nodes):
    result = ""
    for node in nodes:
        result += node.metadata["filepath"] + "\n" + node.page_content + "\n"
    return result


def format_history(history)->str:
    result = ""
    for message in history:
        result += message["sender"] + " : " + message["message"] + "\n"
    return result


def get_file_paths_from_nodes(nodes):
    github_repo_path = "https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/{file}"
    seen_paths = set()
    unique_paths = []

    for node in nodes:
        file_path = node.metadata["filepath"].strip()
        
        if file_path not in seen_paths:
            seen_paths.add(file_path)
            unique_paths.append({
                "file_name": file_path.split('/')[-1],
                "file_path": github_repo_path.format(file=file_path)
            })

    return unique_paths


def get_answer(question: str, history: list[str] = []) -> dict[str, Any]:
    """Get answer from the knowledge base."""
    gemini = get_gemini_llm("gemini-1.5-pro-latest")
    nodes, node_text = _retrieve_from_knowledge_base(question)
    formatted_history = format_history(history)
    answer_from_knowledge_base_prompt = answer_from_knowledge_base_prompt_template.format(
        question=question, documentation=node_text, history=formatted_history
    )
    answer_response = gemini.invoke(answer_from_knowledge_base_prompt)
    conversation_title_prompt = conversation_title_prompt_template.format(history=formatted_history+"\nBot: "+answer_response.content)
    title_response = gemini.invoke(conversation_title_prompt)
    return {
        "answer": answer_response.content,
        "reference_filepaths": get_file_paths_from_nodes(nodes),
        "title": title_response.content,
    }

def _retrieve_from_knowledge_base(question):
    nodes = retriever.invoke(question)
    node_text = (
        format_nodes(nodes)
        if len(nodes) > 0
        else "No relevant information found in the knowledge base."
    )
    
    return nodes,node_text
