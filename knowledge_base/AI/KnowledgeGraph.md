# Knowledge Graphs (Graph RAG)
Graph RAG is an retrieval technique where cypher queries are used in knowledge graphs to retrieve relevant information.
- the knowledge graph creation typically involves using AI to convert unstructured information into triplets (source,relation,target), a group of triplets forms a knowledge graph
- the retrieval usually happens by executing the cypher query converted from natural language query using AI provided the schema of the target knowledge graph

## Naive RAG vs Knowledge Graphs vs Structured data RAG
|Stage| Naive RAG | Knowledge Graphs | Structured data RAG
| --- | --- | -- | -- |
| Chunking | Collect isolated/meaningful entities | Collect entities and relationships between entities. usually in triples -> node1,relation,node2 | Collect information using a fixed table schema
| Indexing | Create node embeddings and store in vectorstore | same as RAG, use graph store | same as RAG, use structured database
| Querying | Semantic search | Cypher Query | SQL Query
| Synthesis | Generate answer from retrieved data | Same as RAG | Same as RAG

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

## When knowledge Graphs outperform Structured data RAG
 - Complex queries which involve multiple relationship needs a lot of SQL `JOIN` operation, which will be time consuming
 - When the data is highly interdependent, we need a lot of columns to store the relationship, the size of the db will be bigger
scenario
```txt
Person A is friend of Person B
Person A likes Sports
Person B works in Google
Google's parent company is Alphabet
```
If we need to create a knowledge graph for the above data, it is as simple as creating 4 nodes and 4 relationships
But if we need to represent in SQL table, we need to create 4 individual tables, which is not efficient to query

## Retrieval techniques
### Semantic search with search depth
Since each node in knowledge graph will also have an embedding, retrieval is carried out same as naive RAG, but on top of the retieved nodes, the connected nodes will also be retrieved based on search depth
example
```txt
Cat --likes--> milk
Edison --found--> lightbulb
milk --has--> calcium
```
If i search for "Animal" with search depth of 2, sematically Cat is similar, Cat is connected to milk with depth of 1, Cat is connected to calcium with depth of 2, so the nodes "Cat,milk,calcium" will be retrieved 

### Using Cypher Query
This is the most popular method of retrieval, the natural language query is converted to cypher query using AI provided the knowledge graph schema

### Agentic Retrieval
This is an extension of cypher Query retrieval technique, when the agent is not satisfied with the retrieved nodes, it can regenerate the cypher query, or nativate to nodes relative to retrieved nodes

### Heirachical Retrieval
When the knowledge graph grows, the schema of the knowledge graph too grows depending on the type of data that were are storing, the llm which converts natural language query to cypher query maynot be able to interpret such large schema
So in heirarchical Retrieval, the knowledge graph is built in a way that has high level communities and sub communities
The schema of high level communities can alone be used in first stage of cypher query generation and the iteration continues for subsequent levels with it's respective schema
This technique was used in [microsoft graphRAG](https://microsoft.github.io/graphrag/)

### Graph Properties for better querying
- Direction
    - Unidirectional
    - Bidirectional
- Weight : How strong is the relationship
- Traversing Algorithm
    - BFS
    - DFS

## Limitations
- Data Cleaning process is difficuilt

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

### Explore
- In Datasheets
- Structured DB vs knowledge graphs
- neo4j repos


