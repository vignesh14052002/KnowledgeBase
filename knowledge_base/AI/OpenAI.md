
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

## OpenAI Cookbook
https://cookbook.openai.com/
## Explore
- https://cookbook.openai.com/articles/techniques_to_improve_reliability
- https://cookbook.openai.com/articles/related_resources