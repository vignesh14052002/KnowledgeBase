## Opendevin

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

## SweepAI

- Have file context in chunk (list of class and functions)
- Pass diff alone to next step

## Guidance
[github](https://github.com/guidance-ai/guidance)

Code inspection
 - openai
    - every gen call triggers a new request, this will add prompt input token cost