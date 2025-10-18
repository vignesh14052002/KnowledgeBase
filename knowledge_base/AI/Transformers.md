
## Understanding Transformers

Softmax
 - Normalizing values so that adding them will result 1 and they will represent probablity
 - Each value is raised to e (ie e^x) to convert negatives and divided by the total

Temperature
 - the `t` variable in softmax function `e^(x/t)`
 - the higher the `t`, the smoother the distribution, so less related token will be sampled


 ### Defeating Non determinism in LLMs
 [Blog](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)
 - What is non determinism?
    - If same prompt is given to LLM multiple times, all the responses will not be exactly similar
 - Why it happens?
    - Output Sampling - temperature parameter
      - Set to 0 to avoid it
    - concurrent operations on floating point numbers
      - Make each operation batch invariant