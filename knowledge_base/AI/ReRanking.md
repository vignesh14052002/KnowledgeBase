# Rerankers
## semantic search vs re-ranking
- cosine similarity in semantic search is faster
    - because embeddings are pre-computed
- re-ranking is slower but more accurate
    - because it uses a reranker model to compute the similarity between the query and the document in runtime


## Types
- cross encoder based
- llm based

## Frameworks
- flashrank
- cohere



## FlashRank
- 4mb model, low latency
