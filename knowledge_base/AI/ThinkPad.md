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

## Tutorials
- [openai : survey of techniques to maximize the LLM performance](https://youtu.be/ahnGLM-RC1Y?si=z5rcC6Ex_MiGyghs)

### Let's build the GPT Tokenizer
- [Video](https://youtu.be/zduSFxRajkE?si=SmhGh_SvWjXf5-cp)
- Question: At 34:03, how does he highlight and scroll?

## TODO
- see what's new in agent protocol
- inspect opensource repos - llama-index, langchain
- explore different AI memory management systems - memgpt
- try using AzureOpenAI to improve latency on concurrent requests
- Go through tru-lens repo
- Do a course in deep learning - 1 hr 
- Watch Andrej karpathy tokenization - 1 hr
- Watch Conference, tech talks
- Find ways to use AI in daily workflow
    - Github copilot code review


## SWE Bench
[site](https://www.swebench.com/)
- resolve github issues with language models
 - Input : Issue, Code base snapshot
 - Output : PR (Code)
 - Evaluation : pre configured unit tests
[paper](https://arxiv.org/pdf/2310.06770v2)
 - 2294 problems took from github issues of 12 popular python repos (which repos?)
 - Benchmark construction pipeline (getting high quality PR)
    - Extract Closed PR and Issue that is being addressed 
    - Only include PRs that modifies test cases
    - Filter by increase in test fail-to-pass ratio



Explore
- [openai](https://openai.com/index/introducing-swe-bench-verified/)
- [genie scored 30%](https://cosine.sh/blog/genie-technical-report)
