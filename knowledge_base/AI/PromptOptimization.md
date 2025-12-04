# Automatic Prompt Optimization
A system that access the quality of prompt and updates it for better performance

## Types
- Without Dataset
    - [OpenAI gpt-5 prompt optimizer](https://platform.openai.com/chat/edit?models=gpt-5&optimize=true)
    - [Anthropic prompt improver](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/prompt-improver)
    - [Google VertexAI prompt optimizer](https://discuss.google.dev/t/vertex-ai-prompt-optimizer-new-algorithm-sdk-for-the-general-availability/253359)
- With Dataset (recommended)
    - [dspy's optimizers](https://dspy.ai/learn/optimization/optimizers/)
        - COPRO, MIPRO, SIMBA, GEPA etc

## Understanding GEPA (Genetic Pareto)

The goal is to improve the valset performance using the feedbacks from trainset

### Terminologies

Program - An entire system with one or more predictors
Predictor - The prompt

### Workflow
- State Initialization
    - Best programs on Valset - [{P0},{P0},{P0}]
- While Budget available, do the following steps
    1) Pareto Selection (Select Program)
    2) Mini batch Selection from trainset (random sampling by default)
    3) Generate and Evaluate Program on mini batch and collect score and feedback
    4) Module Selection (Select Predictors to Update, round robin by default)
    5) Make reflective dataset
        - For each example in mini batch, frame Prompt + Generated output + evaluation feeback in context
    6) Construct a prompt with reflective dataset as context and Use reflection model to propose new prompt
    7) Generate and Evaluate Program on same minibatch #2 with new prompt 
    8) Add the program with new prompt to candidate pool, if the scores are higher than #3
    9) If Programs has more than one predictor and a common ancestor
        - merge them (Genetic Algo) to get new program and repeat step #2 to #8

### Understanding Pareto Sampling

|     | E1  | E2  | E3  | Average |
|-----|-----|-----|-----|---------|
| P1  | 0.5 | 0.3 | 0.6 | 0.46    |
| P2  | 0.5 | 0.4 | 0.7 | 0.53    |
| P3  | 0.8 | 0.1 | 0.2 | 0.36    |

Here If we go by max of Average score to select candidate for optimization, we would have picked P1 always
but P3 has some information which makes it perform better on E1 will be lost

So here, the candidates are P2 and P3, (leaving P1 since it is being dominated by P2 in all examples)
from these candidates weighted sampling is used to identify the one for optimization
in this case, P2 performs good in 2 examples, P3 performs good in 1 example, so
```python
import random
random.choice(["P3","P2","P2"])
```
So P2 has 66% chance of being selected and P3 has 33% chance of being selected
this is to avoid local optima

### Understanding Genetic Algorithm
[Genetic Algorithm](https://medium.com/@AnasBrital98/genetic-algorithm-explained-76dfbc5de85d) will be used to fuse best performing features from parent to create a child

lets say we have a RAG system which involves two prompts (predictors)
1) Query Generation to retrieve documents
2) Final Answer Generation from the retieved documents

lets say we have new programs P2 and P3 which are derived from P1 (common ancestor)
we can create P4 by using predictor #1 from P2 and predictor #2 from P3
we can create P5 by vice versa, and much more if the number of predictors under a program increases

these programs will be evaluated and if there is a best performer, it will be added to the candidate pool

### Things to Keep in mind
- focus on building a robust system before trying to optimize prompt
- quality of dataset is very important
- feedback function should provide very detailed instructions on what went wrong
- try your best to come up with a good base prompt
- It is preferred to have a SOTA reflection model
- validation dataset should be minimal and diverse
- more iterations you run the better the results will be
- review the optimized prompt

## References
- [Research Paper](https://arxiv.org/pdf/2507.19457)
- [GEPA dspy Tutorial](https://youtu.be/gstt7E65FRM?si=n9QdDHgaXdMzPTQK)
