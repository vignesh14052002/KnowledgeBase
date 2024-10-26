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
- how to tokenize?

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

## Result decoding in LLM
- [Blog](https://medium.com/@aalokpatwa/llm-decoding-balancing-quality-and-latency-23632cc0277e)
- greedy decoding
    - choose the token with the highest probability
    - cons
        - may be a local maxima
        - repetitive completions
- beam search
    - keep track of k best completions
    - cons
        - slower, high compute
- nucleus sampling
    - calculate probability distribution by softmax with temperature
    - sort the tokens by probability in descending order
    - collect tokens until the cumulative probability is less than a threshold
    - randomly sample from the collected tokens
- speculative decoding
    - use smaller model to generate completions
    - use larger model to verify completions
    - yet to understand more
- medusa
    - explore https://github.com/FasterDecoding/Medusa


- explore on openai model metric from playground
    - temperature : softmax temperature
    - top-p : cumulative probability threshold
    - frequency penalty
    - presence penalty
- see [this lecture playlist](https://www.youtube.com/watch?v=RM6ZArd2nVc&ab_channel=BerkeleyRDICenteronDecentralization%26AI)