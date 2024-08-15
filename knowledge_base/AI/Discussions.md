# Podcasts
## Bill Gates and Sam Altman
- [Video](https://youtu.be/PkXELH6Y2lM?si=ieiSBnsY7LZ1nieO)
- Before AI, we thought the jobs at higher risk are blue collar followed by white collar and finally creative jobs are at the lowest risk of replacement, but generative AI is going in opposite direction.
- OpenAI planning to make robots, and further cost cutting.

## Microsoft AI research discussion
- [Video](https://youtu.be/9ueDd5-NZco?si=eryLJSCeNxp1Xqdg)
- Better if Data with Text book dense reasoning rather than novel dense reasoning.
- Condensed Knowledge Transfer from LLM to SLM.
- Improving model with human feedbacks.

## Sundar Pichai Google IO interview
- [Video](https://youtu.be/8sxAcYnZFAk?si=yGIAacCMgjWUksXi)
- AI applications needs to be made in a way it will not be included in the underlying model in future.

## Lex Frideman and Arvind Srinivas (Perplexity CEO)
- [Video](https://youtu.be/e-gwvmhyU7A?si=S2_ovErBM909DqCS)
- Giving users before they ask 
  - Suggested questions
  - Answer for top suggested questions  
- Prompt includes each sentence should have citation , others are opinions 
- Doubt: How perplexity synthesis was fast? 
- Future Ideas
  - Dynamic UI for response
    - A best way to display answer for what's weather today is different from answering how to do tax excemption
- Poorly constructed query is not user's fault, better product should be good for lazy people 

## Do you think ChatGPT can reason?
- [Video](https://youtu.be/y1WnHpedi2A?si=ZI-tOspV2Y7hewIE)
- ChatGPT creates an illusion of reasoning, real reasoning comes from Chain of Thought
  - Illusion of reasoning : Things that we think are reasoned out generation might possibly be a memorized response from internet
    Example : Cypher Text Decoding : LLM strugges to decode cypher text where the cypher query and decoded pairs where not available on internet
- will better models need Chain of Thought?
- Companies are focusing on training GPT models with large data instead of trying to creating new architecture shift in AI, like RNN to Transformer

# Tech Talks

## How to add genuinely useful AI to your webapp
- [Video](https://youtu.be/TSNAvFJoP4M?si=Yz5KGhpdpMYiiSSt)
- First 15 minutes is good
- Smart Components
  - Smart paste button - pastes the clipboard content in the expected format
  - Smart search bar - search bar that uses semantic search
  - Smart Textbox - with AI Autocomplete
- Form Input
  - Classification of labels
  - Title generation
- Filtering
  - Summarize the filtered results



# DeepLearning Courses

## Prompt Compression and Query Optimization
- [Course](https://www.deeplearning.ai/short-courses/prompt-compression-and-query-optimization/)
Terminology
- Projecting : Filtering only required information in a chunk for prompt
- Boosting : re-ranking 

Prompt compression 
 - Reducing the size of retrieved documents
    - Metadata filtering
        - Doubt : is there a scenario where post filtering is better than pre-filtering?
 - Reducing the size of the prompt
    - Use LLM to rephrase the prompt : [Microsoft llm lingua prompt compression](https://github.com/microsoft/LLMLingua)