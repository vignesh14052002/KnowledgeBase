# Python

- [25 nooby Python habits you need to ditch](https://youtu.be/qUeud6DvOWI?si=gPbf0Y3ksq-4OGoE)
- Topics to explore:
  - Use Logging module
  - Using list as keyword argument and modifying inside will modify the reference
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


## Fastapi

- Get metrics for application performance
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

## Builtins
- [Docs](https://docs.python.org/3/py-modindex.html)

### Doubts
- use of __init__.py in all subfolders

## One-liners
Problem : is there 3 consecutive odd numbers in the given list?
- [leetcode problem](https://leetcode.com/problems/three-consecutive-odds/description/), [solution reference](https://leetcode.com/problems/three-consecutive-odds/solutions/5395859/one-line-solution/)
```python
# Solution 1
any(1&v&u&w for v,u,w in zip(array,array[1:],array[2:]))
# Solution 2
'111' in ''.join(str(v&1) for v in array)
```

## Interesting Libs
- Native
  - bdb : python debugger
    - didn't found a good usecase yet
  - cProfile : python profiler library
  - doctest : test code in docstring
- Third party
  - tqdm : progress bar
    - find how to print loading circle in terminal
  - pytopuml : generate architecture diagrams from python code

## TODO
- Learn Advanced Python
  - Go through all built in modules
    - Inprogress : until d
  - see realpython
- logging vs print statement

## Libraries to explore

- Pprint
- Tqdm – progress bar
- Regex vs re

## Concepts to explore

- Builtin decorators in class
- Itertools, functools, collections
- dunder methods
- See arjan codes
  - Caching decorators
  - protocols
  - Software design series
- See [codecollider](https://www.youtube.com/@codecollider/videos)

## Doubts
- Poetry commands:
  - `poetry extras`
- when to use multithreading vs multiprocessing vs asyncio
- pytest
  - Pytest vs unittest 
  - Fixtures
  - Timeout in fastapi sockets while testing 

- If child class didn't set a value, it is throwing error only at accessing not initializing

## Ruff
Good rules to add
  - `no-self-use`
  - pyupgrade
- ruff in jupyter notebook
- diff between ignore and entendIgnore?

## Mypy
- why typeguard is needed?
- why NewType is needed?

is @typing.overload same as python 3.12's overload decorator?

version = ["auto"] in fastapi toml?

## Pydantic
- @model_serializer ?
- llama-index instrumentation, workflows

- metaprogramming
- testing
  - mutation testing - mutmut
  - property based testing - hypothesis
  - toolz, pyrsistent, hissp, subrepls
