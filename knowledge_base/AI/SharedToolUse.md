# Sharing Tools for AI Agents Org wide

Tools are a way to provide abilities to AI agents to access external systems. At a Org/Project level tools can be shared to improve productivity, common patterns of sharing them are skills and MCP but both have some flaws

## Why not MCP
- mcp tools are heavy for context, if you have 100 tools each 1k tokens (description, arg schema etc), it will occupy 100k agent context easily.
- claude code mitigates this by tool searching ([minor inconvinience exists like cache breaks](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching#what-invalidates-your-cache)), still other harness like github copilot is not handling the cache miss effectively inducing more usage costs

## Why not Skills
- tool use can be mimicked in skills by writing helper scripts, but the client needs to install dependencies to run the scripts (python or any other sdk)

## Solution
use a single tool `invoke_tool(<tool_name>, <args>)` as a router in your remote server and document how to use it in respective skills


