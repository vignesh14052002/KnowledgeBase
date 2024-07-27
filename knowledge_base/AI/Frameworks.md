
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
- Can we use parallel function calling?
- [Langchain robot server](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/tests/mock_servers/robot/server.py)
- Mock LLM - for unit tests
- Structured output
  - stream structured output
  - [pydantic model with json mode](https://python.langchain.com/v0.2/docs/how_to/structured_output/#advanced-specifying-the-method-for-structuring-outputs)
  - `include_raw=True`
- [Debug Mode](https://python.langchain.com/v0.2/docs/how_to/debugging/#set_debugtrue)

## Explore
- `from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder`
- runnable interface
- how `LCEL` is implemented
- [async streaming?](https://python.langchain.com/v0.2/docs/how_to/streaming/#:~:text=consider%20using%20the-,async%20astream%20API,-%3A)

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
