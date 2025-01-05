## Opendevin

- [architecture docs](https://github.com/All-Hands-AI/OpenHands/tree/main/openhands)
  - mermaid flowchart
- Using [py2puml](../Python/Plantuml.md#py2puml) to dynamically create architecture diagrams
- [agent hub](https://github.com/All-Hands-AI/OpenHands/blob/main/openhands/agenthub/README.md)
  - Codeact agent will collect relevant code chunks
  - how monolog agent is used?
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

Finding Code:
  - Have file context in chunk (list of class and functions)
  - For every file and folder, decide if that will be useful

## Guidance
[github](https://github.com/guidance-ai/guidance)
- Have control on the model's decode loop, passing expected tokens whereever needed
  - get structured output
  - low cost and time
Code inspection
 - openai
    - every gen call triggers a new request, this will add prompt input token cost
  
## SWE Bench : AI Agent benchmarking
[site](https://www.swebench.com/),[paper](https://arxiv.org/pdf/2310.06770v2)
- resolve github issues with language models
  - Input : Issue, Code base snapshot
  - Output : PR (Code)
  - Evaluation : pre configured unit tests
- 2294 problems took from github issues of 12 popular python repos (django, flask, matplotlib etc)
- Benchmark construction pipeline (getting high quality PR)
  - Extract Closed PR and Issue that is being addressed 
  - Only include PRs that modifies test cases
  - Only include PRs where the closed PR's snapshot is in a runnable state without any errors
  - Filter by increase in test fail-to-pass ratio
  - After filtering, out of 90000 problems, 2294 were selected
- [openai](https://openai.com/index/introducing-swe-bench-verified) partnered to verify the benchmark
  - makes sure the tests captures that the Issue is fixed and are not dependent on the implementation details (follows BDD)

## SWE Agent
[site](https://github.com/princeton-nlp/SWE-agent),[paper](https://arxiv.org/pdf/2405.15793v2)
- ACI (Agent Computer Interface)
  - high level api or command that the agent can use to access the environment
  - Why not HCI (Human Computer Interface)?
      - [Self operating Computer](https://github.com/OthersideAI/self-operating-computer) uses HCI to interact, Monitor Screenshots and keyboard inputs
      - HCI is for broad usage, swe agent focuses only on software engineering tasks
- uses Re-Act prompting
- Observe
  - Commands: find_file, search_file, search_dir : max 50 results (All commands in pg 17)
  - File Viewer Context: file path,line numbers, total num lines, num lines before and after the current code : max 100 lines
  - Navigation in a file: scroll up, scroll down, go to line
- Perform action
  - Action Format: Line range to edit in active file, code block.
  - Before applying patches, lint it and if any error, don't apply
- Evaluate
  - run pytest
- Design at page 16
### TODO
- Managing History
- See logs, walk through an example

Paper
- Good pages:
 - pg 6, table 3 | page 7, Figure 5,6: compare tuning actions
 - pg 7: Section 5.2 : Analysis of Agent behaviour
    - most issues will have code block to reproduce them, the agent is creating a new file and reproducing the issue to get more clarity
- Doubts:
  - page 6,  figure 4 , what is k?
  - page 7, difference between iterative and summarized search?
  - page 8, figure 7, what is turn?


Explore
- [genie scored 30%](https://cosine.sh/blog/genie-technical-report)