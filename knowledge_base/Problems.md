## Workflow Automation
### Removal of Unused Stuff 
1) Packages
    - Ways to find and remove unused packages in `package.json` or `poetry.toml`?
2) Env Variables
    - Ways to find which env variables are not used from `.env` file?

## Debugging
### VSCode Debugger
1) Auto Breakpoint on exception
    - Current workflow
        - If any exception arises in debug mode, the debgger stops
        - Then we have to find the error line from the stack trace
        - Wrap the error line in try-catch block and add a breakpoint on catch block
    - Desired workflow
        - the execution automatically pauses at the line of error to debug
#### Python
1) Disabling pytest coverage on debug mode
    - If we have pytest coverage enabled, the debugger is not stopping at breakpoints
    - How to automatically disable pytest coverage on debug mode?
2) How to profile async code? (`cprofile` is not working)

## FastAPI
1) Tests to validate Swagger UI examples
    - refer [this thread](https://www.reddit.com/r/FastAPI/comments/1fmlw4v/is_there_a_way_to_dynamically_validate_swagger_ui/)
 