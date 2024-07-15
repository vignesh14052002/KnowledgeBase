# Retriever Types
- keyword search : BM25
- Vector Search
    - sparse vectors : Similar to keyword search
    - dense vectors
- misc
    - [hypothetical document embeddings](https://python.langchain.com/v0.1/docs/templates/hyde/)

## Sparse Vectors
- [reference](https://qdrant.tech/articles/sparse-vectors/)

# Fusion Retriever
- usage of more than one retriever

## Fusion Retriever Score Calculation

### Adding weights to each retriever

- formula for combining the scores
```
score = sum(weight_i * score_i) / sum(weight_i)
```
### Reciprocal Reranking

| | Retrier 1 | Retriever 2 | Node i Reranking score
|---|---|---|---|
| Node 1 pos | 1 | 5 | 1/1 + 1/5 = 1.2
| Node 2 pos | 7 | 9 | 1/7 + 1/9 = 0.25

### Score Normalization

```
Normalized Score = (Original Score - Minimum Score) / (Maximum Score - Minimum Score)
```
After normalization, the scores will be between 0 and 1. so we can do a threshold filtering


## Doubts
- weaviate
    - [ranked fusion](https://weaviate.io/blog/hybrid-search-fusion-algorithms#ranked-fusion) why to divide rank by 60?
    - [relative score fusion](https://weaviate.io/blog/hybrid-search-fusion-algorithms#relative-score-fusion), why to normalize the score for each retriever?
- qdrant
    - [SPLADE](https://qdrant.tech/articles/sparse-vectors/#why-splade-works-term-expansion), how term expansion works?
