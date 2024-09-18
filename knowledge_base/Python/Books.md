# Intro
The following are some of the books that I have read and found useful. They are not the summary of the books but the key points that I found useful.
I usually skip points that are already known to me, so i would recommend reading the full book.

# Python Tricks: A Buffet of Awesome Python Features
- [Book](https://github.com/plthiyagu/CheatSheet/blob/master/Python%20Tricks.pdf)
- Assertions 
    - Use for dev debugging, not for user exceptions 
- `with` statements (context managers)
    - can be used for any object that has __enter__ and __exit__ methods
    - `@contextmanager` can be used to convert a function with `yield` to a context manager
- `_` in python interpreter gives last executed value, will be useful in debugging console
- use `@functools.wraps(func)` as best practice for all decorators, this will preserve the metadata of the original function (like docstring, name, etc) on hovering over the function
- python functions will return `None` by default, but don't make use of it since it miscommunicated 
- `__str__` vs `__repr__` 
    - `__str__` is for user readability 
    - `__repr__` is more verbose and for dev debugging 
    - if `__str__` is not implemented `__repr__` will be used, the default `__repr__` will have class/method name which is not useful, better to implement for all class we define 
- use `repr(err)` while logging errors 
- Custom exceptions
    - Defining custom exceptions helps in catching a particular exception alone in a outer module 
    - Derive custom exceptions from more specific exception
    - Good with `EASP` instead of `LBYL` - [ref](https://stackoverflow.com/questions/11360858/what-is-the-eafp-principle-in-python)
- Class decorators
    - `@classmethod` can be used to create multiple constructors, methods that do not depend on instance attributes
    - `@staticmethod` can be used to tell that the method is independent of the class and instance attributes but related to the class 
- Datastructures
    - Use `MappingProxyType` for immutable dict 
    - Use `set()` where intersection will be computed 
    - Explore `Lifoqueue, multiprocessing.queue` 
- Generators can be used to create chains where processing happens one at a time 
- Replace switch cases with `dict[condition,function]` with default function in getter 

## TODO
 - Check pydantic basemodel's `__repr__`
 - Check pydantic model's immutability

## Fluent Python
- Nested unpacking in loops 
    - for index,(val1,val2) in enumerate(zip(iter1,iter2)): 
- Match case 
    - How different from switch case 
        - Advanced pattern matching in case 
    - doubts
        - Can it be combined with dict pattern for switch case?
    - example pattern matching
        - match data 
            case : ['val1',int(a),(*_,int(b))] if a+b < 5 
- If slicing is repetitive, name it and reuse , example : `reverse = slice(::-1)` 
    - doubt : What can be the naming convention of slice? 
- typehints
    - use standard types instead of typing module
    - typeAlias for complex types
    - TypeVar for generic types  
    - doubts
        - Tuple[int,...] or list[int]? 
        - ... In pydantic field?
- Add ruff's no-self-use rule, to check unnecessary self usage in class methods
- explore : mypy type coverage report
- method overriding
    - use `@abstractmethod` to ensure derived class implements the method
    - use `@override` (supports python 3.12 or above) to ensure base class method is overriden in derived class
- use `non-local` to modify outer scope variable in nested functions
- don't use mutable default kwargs, it will gets initialized only once 
- `del` only removes reference
- doubt : When to enforce positional only or keyword only functions?
- useful builtin decorators
    - `@lrucache` for least recently used cache
    - `@singledispatch` for function overloading

## Architecture patterns with python 
[Book](https://cosmicpython.com/book/preface.html)
 - Three layered architecture  
    - Endpoints -> business logic -> data operations 
 - Dependency inversion 
 - High level functions should not depend on low level function 
    - High level - business logic 
    - Low level - technical aspects (network protocol etc) 
 - Persistence ignorant code 

## Books i might read
- [Intermediate to Advanced Books mentioned in realpython](https://realpython.com/best-python-books/#best-intermediate-and-advanced-python-books)