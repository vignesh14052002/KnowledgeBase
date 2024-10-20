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
- Go through tru-lens repo
- Do a course in deep learning - 1 hr 
- Watch Andrej karpathy tokenization - 1 hr
- Watch Conference, tech talks
- Find ways to use AI in daily workflow
    - Github copilot code review

- read [result decoding in LLM](https://medium.com/@aalokpatwa/llm-decoding-balancing-quality-and-latency-23632cc0277e)
- explore on openai model metric from playground
    - temperature
    - top-p
    - frequency penalty
    - presence penalty
- see [this lecture playlist](https://www.youtube.com/watch?v=RM6ZArd2nVc&ab_channel=BerkeleyRDICenteronDecentralization%26AI)

## OpenAI Structured Output
- [blog](https://openai.com/index/introducing-structured-outputs-in-the-api/)
- Offering 100% reliability in structured output
- inspired from guidance and lark

How it works
- supply a pydanitc model along with prompt in API call
- the pydantic model will be converted into Context Free Grammer and cached for future requests
    - Due to this process, first request alone will take additional ~10 seconds to respond
- The Context Free Grammer will be used for Constrained Decoding on each token prediction

Limitations
- There can be some cases where structured output is not possible, in such cases a boolean `refusal` will be returned
    - Cases `refusal` will be returned
        - gaurdrails: when model considers response to be unsafe
        - max token limit reaches
- Regex in pydantic model's attribute will not be guarenteed to be matched