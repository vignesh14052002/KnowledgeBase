from langchain_core.prompts import PromptTemplate

prompt = """
You are an helpful chat assistant

{question}
"""
answer_from_knowledge_base_prompt_template = PromptTemplate(
    template=prompt,
    input_variables=["question"],
)
