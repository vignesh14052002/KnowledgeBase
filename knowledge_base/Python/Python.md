# Python

- [25 nooby Python habits you need to ditch](https://youtu.be/qUeud6DvOWI?si=gPbf0Y3ksq-4OGoE)
- Topics to explore:
  - Use Logging module
  - Using list as keyword argument and modifying inside will modify the reference
  - `==` vs `is`
  - Key in `max()`

- [fstrings](https://www.reddit.com/r/Python/s/GUBcYl376V)
  - Example: `"f{a=:-^4}"`

# Core

- slice()
- [yield usecases](https://guicommits.com/python-yield-examples/)
  - clean code
  - file reading
  - pytest - not clear

- [faster-json-parsing](https://pythonspeed.com/articles/faster-python-json-parsing/)

# pytest
remove pytest-cov to fix breakpoint not hitting issue in vscode
## Doubts

- Poetry commands:
  - `poetry lock –no-update`
  - `poetry extras`
- when to use multithreading vs multiprocessing vs asyncio

## Libraries to explore

- Pprint
- Tqdm – progress bar
- Regex vs re
- pytopuml - generate architecture diagrams from python code

## Concepts to explore

- With block
- Builtin decorators in class
- Itertools, functools, collections
- dunder methods
- See arjan codes
  - Caching decorators
- See [codecollider](https://www.youtube.com/@codecollider/videos)

## Fastapi

- Get metrics for application performance
- Yield
- Rate limit
- DependsOn
- Pulimi
- Grpc?
- [AsyncClient instead of requests](https://youtu.be/row-SdNdHFE?si=SKugDtfBxVT9qQUe)

## Asyncio

- [tutorial](https://youtu.be/Qb9s3UiMSTA?si=0UHJM7ou_TEmOSIY)
- Create task, gather, taskGroup, future, lock
- How to optimise execution
- Can i combine asyncio and multiprocesssing?

## cProfile

- python profiler library

## One-liners
Problem : is there 3 consecutive odd numbers in the given list?
- [leetcode problem](https://leetcode.com/problems/three-consecutive-odds/description/), [solution reference](https://leetcode.com/problems/three-consecutive-odds/solutions/5395859/one-line-solution/)
```python
# Solution 1
any(1&v&u&w for v,u,w in zip(array,array[1:],array[2:]))
# Solution 2
'111' in ''.join(str(v&1) for v in array)
```
