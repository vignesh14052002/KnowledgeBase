
## OpenAI
- [batch API](https://platform.openai.com/docs/guides/batch/overview)
## Langchain

- Langchain cli
- Langserve – like agent protocol, playground route
- Langchain optional dependencies (like unstructuredIo)
- Langsmith
  - Why not local? Data privacy?
- LangGraph
- [Langchain Integrations](https://integrations.langchain.com/)
- Langchain expression language
  - [RAG in LCEL](https://python.langchain.com/v0.2/docs/tutorials/rag/)
  ```python
  rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
  )
  ```
- Langhub prompts
- Can we use Convert_pydantic_to_openai_function from langchain for our skills?
- Structured output while streaming (partial json parser)
- Can we use parallel function calling?
- [Langchain robot server](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/tests/mock_servers/robot/server.py)
- Mock LLM - for unit tests

## Langchain over llama-index
- Usage Cost Tracing
- [Weaviate Hybrid search](https://github.com/langchain-ai/langchain/issues/21147#issuecomment-2097245513)
- [Ensemble Retriever](https://python.langchain.com/v0.1/docs/modules/data_connection/retrievers/ensemble/)

## LiteLLM
- supports many models
- has proxy servers
- [calculate cost](https://docs.litellm.ai/docs/completion/token_usage)

## Explore
- dspy
- litellm
- [flashrank](https://github.com/PrithivirajDamodaran/FlashRank)
- [guidance](https://github.com/guidance-ai/guidance)
  - use openai logger and check the llm calls
- [Finite State machine token decode](https://lmsys.org/blog/2024-02-05-compressed-fsm/)
