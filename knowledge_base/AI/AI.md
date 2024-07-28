# AI

## Chunking

- [5 levels of chunking](https://youtu.be/8OJC21T2SL4?si=ljYjQkVy7MOUtgWT)
- [ChunkViz Tool](https://chunkviz.up.railway.app/)

## Evaluation
- Ragas evaluation
- F1 score
- truelens
- llm leaderboard
- autogpt benchmark

## Agent Protocol
- architecture for multi agent communication

## Tokenization – Andrej Karpathy

- Gpt problems where tokenization is the problem, (reverse a string etc)
- Gpt optimized python indentation tokens
- Byte pair encoding
- Separate tokens of end-of-string, system-message, user-message, ai-message

### Memory management

- Microsoft copilot chat - create long term and short term memory from the current conversation
- [memary](https://github.com/kingjulio8238/memary)
- memgpt


### Github Copilot

use/build Extension on top of gihub copilot
Watch - <https://youtu.be/RXaLlCeaBIA?si=a2eZp7bNOWHXZSSY>

- FIM (Fill in middle) mode
- Codex for ghost text, GPT-4 for chat window
- Retrieve max 20 files for generation, give priority to open files
- Retrieved node info – relative path , language, snippet

## Tutorials
- [openai : survey of techniques to maximize the LLM performance](https://youtu.be/ahnGLM-RC1Y?si=z5rcC6Ex_MiGyghs)

### Let's build the GPT Tokenizer
- [Video](https://youtu.be/zduSFxRajkE?si=SmhGh_SvWjXf5-cp)
- Question: At 34:03, how does he highlight and scroll?

### Action Items
- see what's new in agent protocol
- inspect opensource repos - llama-index, langchain
- explore different AI memory management systems - memgpt
- try using AzureOpenAI to improve latency on concurrent requests


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