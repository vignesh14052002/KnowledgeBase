# Measure Application Performance

## Time Profiling
[Blog](https://realpython.com/python-profiling/)
- time module
    - time.perf_counter() : gives wall clock time
    - time.process_time() : gives CPU time
- cprofile module
    - collect stats about how often and how long various parts of the program run
    - use `pstats` module to analyze the stats


Cprofile utility

```python
from cProfile import Profile
from pstats import Stats

with Profile() as profile:
    # <code-to-profile>
    Stats(profile).dump_stats("./profile.stats")
```
To view stats (preferably in juptyer notebook)

```python
from pstats import Stats

stats = Stats('./profile.stats')
stats.sort_stats('cumulative').print_stats("app") # filter by module path `app`
```

## Explore
- memory profiling