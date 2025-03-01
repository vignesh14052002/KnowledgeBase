from langchain_core.prompts import PromptTemplate

answer_from_knowledge_base_prompt = """
You are an helpful chat assistant, who provides answers from the knowledge base.

Info on Knowledge base:
   Hi, i am vignesh, the knowledge base contains my personal notes and learning documentation.

Conversation History:
{history}

User:
{question}

Relevant Information from Knowledge Base:
{documentation}

Instructuions:
- Be friendly and helpful.
- Try to answer the user's question from the provided information.
- If you are unsure, ask the user for more information.

Output Format:
- The output should be in markdown format.
- If you want to mention any links, use [Suitable link text](url).
"""
answer_from_knowledge_base_prompt_template = PromptTemplate(
    template=answer_from_knowledge_base_prompt,
    input_variables=["question", "documentation", "history"],
)

conversation_title_prompt = """
Give me a suitable title for this conversation.

Conversation History:
{history}

Instructions:
- The title should be short (max 3 words).

Suitable Title:
"""

conversation_title_prompt_template = PromptTemplate(
    template=conversation_title_prompt,
    input_variables=["history"],
)