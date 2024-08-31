# Optimizations

- I/O bound
    - threading
    - concurrency : asyncio
- CPU bound
    - multiprocessing

## Threading
 - run tasks in parallel, same memory space

## Concurrency
 - switch context when tasks waiting for I/O
 - use semaphore to limit the number of tasks running at a time

## Multiprocessing
 - run tasks in parallel, separate memory space

Explore
 - concurrent.futures
 - fastapi async endpoints

Doubts
 - when to go for blocking vs non-blocking calls