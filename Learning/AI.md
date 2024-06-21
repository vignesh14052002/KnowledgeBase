# AI

## Conversation between Bill Gates and Sam Altman

- Before AI, we thought the jobs at higher risk are blue collar followed by white collar and finally creative jobs are at the lowest risk of replacement, but generative AI is going in opposite direction.
- OpenAI planning to make robots, and further cost cutting.

## Langchain

- Langchain cli
- Langserve – like agent protocol, playground route
- Langchain optional dependencies (like unstructuredIo)
- Langsmith
  - Why not local? Data privacy?
- LangGraph
- [Langchain Integrations](https://integrations.langchain.com/)
- Langchain expression language
- Langhub prompts
- Can we use Convert_pydantic_to_openai_function from langchain for our skills?
- Structured output while streaming (partial json parser)
- Can we use parallel function calling?
- [Langchain robot server](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/tests/mock_servers/robot/server.py)

## Chunking

- Ragas evaluation
- ChatViz
- [5 levels of chunking](https://youtu.be/8OJC21T2SL4?si=ljYjQkVy7MOUtgWT)

## Chunkviz

[SambaNova Systems | Generative AI, optimized for enterprise and government](https://sambanova.ai/)

## Microsoft AI research discussion

- Better if Data with Text book dense reasoning rather than novel dense reasoning.
- Condensed Knowledge Transfer from LLM to SLM.
- Improving model with human feedbacks.

## Tokenization – Andrej Karpathy

- Gpt problems where tokenization is the problem, (reverse a string etc)
- Gpt optimized python indentation tokens
- Byte pair encoding
- Separate tokens of end-of-string, system-message, user-message, ai-message

## LLama index

- Mock llm

[Sundar Pichai Google IO interview](https://youtu.be/8sxAcYnZFAk?si=yGIAacCMgjWUksXi)

- AI applications needs to be made in a way it will not be included in the underlying model in future.

## OpenSource Projects

### Opendevin

- [architecture docs](https://github.com/OpenDevin/OpenDevin/tree/main/opendevin)
  - mermaid flowchart
- [Dynamically create architecture diagram](https://opendevin.github.io/OpenDevin/modules/usage/architecture#:~:text=code%20using%20the-,py2puml%20tool.,-The%20diagram%20is)
- [agent hub](https://github.com/OpenDevin/OpenDevin/blob/main/agenthub/README.md)
  - Codeact agent will collect relevant code chunks
  - how monolog agent is used
  - hint in planner agent?
- [evaluation](https://github.com/OpenDevin/OpenDevin/blob/main/evaluation/README.md)
- Community
  - Slack
    - check llm usage tracking question
- Misc
  - Code execution in sandbox
  - For Astro : Check if api key is exposed in dev tools
  - [LLM Debugging](https://github.com/OpenDevin/OpenDevin/blob/main/Development.md#6-llm-debugging)
- Tests
  - same as langchain, unit and integration tests in seperate folder
  - llm is mocked while testing agents

### SweepAI

- Have file context in chunk (list of class and functions)
- Pass diff alone to next step

### Memory management

- Microsoft copilot chat - create long term and short term memory from the current conversation
- [memary](https://github.com/kingjulio8238/memary)
- memgpt

### Explore Frameworks

- dspy

### Github Copilot

use/build Extension on top of gihub copilot
Watch - <https://youtu.be/RXaLlCeaBIA?si=a2eZp7bNOWHXZSSY>

- FIM (Fill in middle) mode
- Codex for ghost text, GPT-4 for chat window
- Retrieve max 20 files for generation, give priority to open files
- Retrieved node info – relative path , language, snippet

### Action Items

- see gemini pricing
- see what's new in agent protocol
- inspect opensource repos - llama-index, langchain
- explore different AI memory management systems - memgpt
