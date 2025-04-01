from mcp.server.fastmcp import FastMCP
import time
import signal
import sys

from app.functions.chat_with_knowledge_base import _retrieve_from_knowledge_base

# Handle SIGINT (Ctrl+C) gracefully
def signal_handler(sig, frame):
    print("Shutting down server gracefully...")
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

mcp = FastMCP(
    name="vignesh-knowledge-base",
    host="127.0.0.1",
    port=5000,
    timeout=30
)

# Define our tool
@mcp.tool()
def search_knowledge_base(query: str) -> str:
    """Search the given query in vignesh's knowledge base."""
    return _retrieve_from_knowledge_base(query)

if __name__ == "__main__":
    try:
        print("Starting MCP server on 127.0.0.1:5000")
        mcp.run()
    except Exception as e:
        print(f"Error: {e}")
        time.sleep(5)