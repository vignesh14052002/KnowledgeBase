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
[Graph RAG](https://graphrag.com/concepts/intro-to-graphrag/) has an entensive set of techniques, below are some of them
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
This is an extension of cypher Query retrieval technique, when the agent is not satisfied with the retrieved nodes, it can regenerate the cypher query, or navigate to nodes relative to retrieved nodes

### Heirachical Retrieval
When the knowledge graph grows, the schema of the knowledge graph too grows depending on the type of data that were are storing, the llm which converts natural language query to cypher query maynot be able to interpret such large schema
So in heirarchical Retrieval, the knowledge graph is built in a way that has high level communities and sub communities
The schema of high level communities can alone be used in first stage of cypher query generation and the iteration continues for subsequent levels with it's respective schema
This technique was used in [microsoft graphRAG](https://microsoft.github.io/graphrag/)

### Cypher Queries are powerful - Neo4j
 - [neo4j Cypher manual](https://neo4j.com/docs/cypher-manual/current/introduction/)
 - Flexible filtering of nodes, using node properties and relationships
 - Use Semantic search as part of cypher query - [ref](https://neo4j.com/blog/genai/vector-search-deeper-insights/)
 - Use builtin 65+ Advanced [Neo4j Graph Algorithms](https://neo4j.com/docs/graph-data-science/current/algorithms/) like shortest path between nodes, community detection, topological sorting etc

## Tips to Build knowledge graphs
- Build a single knowledge graph instead of multiple small ones
- Use flexible schema while doing LLM extraction and do cleanup later to avoid dataloss

## Limitations
- Data Cleaning process is difficuilt, different nodes with same meaning etc
- When the graph size increases the schema size will increase too, difficuilt to get cypher query from LLM with large schema in context

### Overcoming Schema Expansion
As new nodes keep on getting into the graph, over the time the schema will be huge making it difficuilt for LLM to identify and query them, there are few techniques to overcome this
 - Do a postprocessing of graph to combine similar nodes and relationships using [machine learning algorithms](https://neo4j.com/docs/graph-data-science/current/machine-learning/machine-learning/) or [gen ai prompts](https://github.com/neo4j-labs/llm-graph-builder/blob/4d7bb5e83dd8aeb0e708a7488ae383301944689f/backend/src/shared/constants.py#L833C1-L833C22)
 - Form communities and do Heirarcical retrieval, once a sub community is found, give the specific community schema to LLM to generate queries
 - Filter the Schema based on user query
    - Only include nodes and relation labels which are in query - [ref](https://arxiv.org/html/2505.05118v1#:~:text=3.1%20Static%20Schemas-,Report%20issue%20for%20preceding%20element,Report%20issue%20for%20preceding%20element)
    - Ask Predefined questions and Get Filters from LLM.

## Libraries
### Neo4j
- graph database
- uses [cypher query language](https://neo4j.com/docs/cypher-manual/current/introduction/)


### Microsoft GraphRAG
- [Repo](https://github.com/microsoft/graphrag?tab=readme-ov-file),[White Paper](https://arxiv.org/pdf/2404.16130),[Demo Video](https://youtu.be/jCjyaQL-7mA?si=PTPT9XdJdX-2wbdi)
- Good for QFS (Query Focused Summarization) (eg: What is this document about?)
  - get answer with score for a query parallely in local communities
  - filter by score and combine them and give to global community for final answer

### APIs
- [Diffbot](https://www.diffbot.com/products/knowledge-graph/)

### Finetuned models
- [GliNER](https://github.com/urchade/GLiNER)
- [GLiREL](https://github.com/jackboyla/GLiREL/tree/main)
- [Relik](https://github.com/SapienzaNLP/relik)


## Understanding Neo4j LLM Graph Builder

Source code - [Github](https://github.com/neo4j-labs/llm-graph-builder/tree/main)

### How KG is built while uploading documents
- Each page is tokenized and chunked based on `token_chunk_size`
  - metadata as page_number
- Chunks are pushed to DB
  - Document -[FIRST_CHUNK]-> Chunk1
  - Chunk<i> -[NEXT_CHUNK]-> Chunk<i+1>
  - Chunk<i> -[PART_OF]-> Document
- Langchain `LLMGraphTransformer` is used to extract triplets from Chunks
  - The LLM response will get [nodes and relationships seperately](https://medium.com/data-science/building-knowledge-graphs-with-llm-graph-transformer-a91045c49b59#:~:text=The%20response%20from%20the%20LLM%20Graph%20Transformer%20will%20be%20a%20graph%20document%2C%20which%20has%20the%20following%20structure) instead of triplets
- Nodes are pushed to DB
  - LLM Extracted nodes and relationships
  - Chunk -["HAS_ENTITY"]-> Node

#### PostProcessing
- Each chunk is connected to 5 semantically similar chunks
  - Chunk<i> -[SIMILAR]-> Chunk<j>
- vector index and full text indexes were created
  - explore [full text index](https://neo4j.com/docs/cypher-manual/current/indexes/semantic-indexes/full-text-indexes/)
- llm call is made to merge similar nodes and relationships
- communities were formed using leiden algorithm and community summaries are generated using LLM
  - explore how leiden algo works

### RAG
#### Graph + Vector + FullText
Semantic retrieval
langchain `Neo4jVector` retriever is used
config
  - top k = 5
  - score threshold = 0.5

Flow
 - LLM Query Generation
 - [Compression Document retriever](https://python.langchain.com/docs/how_to/contextual_compression/)

Don't know how they are combining with graph results, seems they are doing only vector search

# Applications using KG
- [Claude MCP Memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)

# References
- [graphrag.com](https://graphrag.com/concepts/intro-to-graphrag/)