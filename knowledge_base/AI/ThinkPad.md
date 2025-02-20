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
    - use smaller model (draft model) to generate completions
    - use larger model to verify completions in single pass
    - Example:
        - draft model - gpt-3 : Time to predict token - 1s
        - larger model - gpt-4 : Time to predict token - 2s
        - draft model token generation for each iteration - 3
        - output tokens count - 12
        - time for larger model alone - 12 * 2 = 24s
        - for 1 iteration
            - draft model generation - 3 * 1 = 3s
            - larger model verification (parallel) - 2 * 1 = 2s
            - total time - 5s
        - best case : all guess from draft model are correct
            - valid tokens per iteration - 3
            - total iterations - 12/3 = 4
            - total time - 4 * 5 = 20s (saved 4s)
        - worst case: all guess from draft model are wrong
            - valid tokens per iteration - 1 (from larger model)
            - total iterations - 12/1 = 12
            - total time - 12 * 5 = 60s (extra 36s)

- medusa
    - explore https://github.com/FasterDecoding/Medusa
    - [video](https://youtu.be/Jjjn-J9SJ1s?si=Ky-Y44_-56Vm3aqY)
    - no draft model, instead use more heads in the model
    - yet to understand more

- explore on openai model metric from playground
    - temperature : softmax temperature
        - [understanding openai's temperature](https://www.coltsteele.com/tips/understanding-openai-s-temperature-parameter)
    - top-p : cumulative probability threshold
        - [top-p temperature table](https://community.openai.com/t/cheat-sheet-mastering-temperature-and-top-p-in-chatgpt-api/172683)
    - frequency penalty
    - presence penalty
    
- see [this lecture playlist](https://www.youtube.com/watch?v=RM6ZArd2nVc&ab_channel=BerkeleyRDICenteronDecentralization%26AI)

## Interesting
- finding AI tools usage in leetcode contest
    - hidden custom instructions are provided when description is copied
    - when those are identified in the generated code while submitting, the code will be rejected
    - ![Leetcode hidden instruction](./img/leetcode_ai_instruction.png)
  
## Anthropic economic index
[blog](https://www.anthropic.com/news/the-anthropic-economic-index)
- analyzed over a million conversations with claude
- main findings
  - most of the users are software engineers (36%)
  - usage slightly leaning towards augumentation rather than automation
  - usage is more common in mid to high pay jobs, not in lowest or highest pay jobs
  - only 4% of the jobs use AI more than 75% of their tasks
    - 36% of jobs have AI usage atleast 25% of their tasks
- how conversations are analyzed
  - using clio : a bot to classify conversations
  - classified conversations into occupational tasks

# claude new features
 - Citations API - https://www.anthropic.com/news/introducing-citations-api
   - provides source information for each block of generated text
   - under the hood : additional instructions are added in system message
- Model Context protocol - https://docs.anthropic.com/en/docs/build-with-claude/mcp
  - similar to agent protocol
# explore
- anthropic prompt improver and prompt evaluator