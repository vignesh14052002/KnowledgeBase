import os
import re

ROOT_PATH = os.path.join(os.path.dirname(__file__), "..")
README_WITH_PLACEHOLDERS_PATH = os.path.join(
    os.path.dirname(__file__), "README_with_placeholders.md"
)
README_PATH = os.path.join(ROOT_PATH, "README.md")

with open(README_WITH_PLACEHOLDERS_PATH, "r") as file:
    readme = file.read()


def get_documents_count():
    # Count of all markdown files in repo recursively
    count = 0
    for root, dirs, files in os.walk(ROOT_PATH):
        for file in files:
            if file.endswith(".md"):
                count += 1
    return count


PLACEHOLDER__FUNCTION_MAP = {"documents_count": get_documents_count}
PLACEHOLDER_PATTERN = re.compile(r"!\@\((.*?)\)")

# Replace all placeholders with the actual values
for pattern_match in PLACEHOLDER_PATTERN.finditer(readme):
    placeholder = pattern_match.group(1)
    function = PLACEHOLDER__FUNCTION_MAP.get(placeholder)
    if function:
        value = function()
        readme = readme.replace(pattern_match.group(0), str(value))

# Update the README.md file with the latest content
with open(README_PATH, "w") as file:
    file.write(readme)
