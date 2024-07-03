import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import chat_with_knowledge_base

app = FastAPI(
    title="Chat with Knowledge Base API Documentation",
    version="0.0.1",
    description="API Documentation for Knowledge Base Chatbot",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    chat_with_knowledge_base.router,
    prefix="/v1/knowledge-base",
    tags=["Chat with Knowledge Base"],
)


def main():
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)


if __name__ == "__main__":
    main()
