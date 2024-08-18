# Intro
The following are some of the books that I have read and found useful. They are not the summary of the books but the key points that I found useful.
I usually skip points that are already known to me, so i would recommend reading the full book.

# Python Tricks: A Buffet of Awesome Python Features
Status: pg 120/299
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

## TODO
 - Check pydantic basemodel's `__repr__`
 - Check pydantic model's immutability


 

 

Defining custom exceptions helps in catching a particular exception alone in a outer module 

Derive custom exceptions from more specific exception 

Good with EASP instead of LBYL https://stackoverflow.com/questions/11360858/what-is-the-eafp-principle-in-python 