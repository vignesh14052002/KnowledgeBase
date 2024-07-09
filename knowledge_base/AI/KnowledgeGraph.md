# Knowledge Graphs (Graph RAG)
- convert Unstructured data to structured data (graph) with AI
- get information from structured data

## Naive RAG vs Knowledge Graphs
|Stage| Naive RAG | Knowledge Graphs |
| --- | --- | -- |
| Chunking | Collect isolated/meaningful entities | Collect relationships between entities. usually in triples -> node1,relation,node2 |
| Indexing | Embed data to Vector Space | Connect entities with relationships (Knowledge graph) |
| Querying | Semantic search | Query Knowledge graphs (Cypher Query) |
| Synthesis | Generate answer from retrieved data | Same as RAG |

## When Knowledge Graphs outperform RAG
scenario
```
data:
chunk 1: "Person A is a friend of Person B"
chunk 2: "Person A's age is 25"
chunk 3: "Person B's age is 30"
... other chunks
query : "What is the age of Person A's friend?"
```
[sample large dataset](https://github.com/yixuantt/MultiHop-RAG)

here semantic search will not retrieve chunk3, but knowledge graph with search-depth 2 will retrieve it

### Graph Properties for better querying
- Direction
    - Unidirectional
    - Bidirectional
- Weight : How strong is the relationship
- Traversing Algorithm
    - BFS
    - DFS

## Libraries
### Neo4j
- graph database
- use cypher query language

### Microsoft GraphRAG
- [Repo](https://github.com/microsoft/graphrag?tab=readme-ov-file),[White Paper](https://arxiv.org/pdf/2404.16130),[Demo Video](https://youtu.be/jCjyaQL-7mA?si=PTPT9XdJdX-2wbdi)
- Good for QFS (Query Focused Summarization) (eg: What is this document about?)
  - get answer with score for a query parallely in local communities
  - filter by score and combine them and give to global community for final answer

#### Doubts
precision and recall?
gleanings?
logitbias?
community detection algorithms? Leiden algorithm?


