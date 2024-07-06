import os
import re
from datetime import datetime
from dateutil.relativedelta import relativedelta

ROOT_PATH = os.path.join(os.path.dirname(__file__), "..")
KNOWLEDGE_BASE_PATH = os.path.join(ROOT_PATH, "knowledge_base")
README_WITH_PLACEHOLDERS_PATH = os.path.join(
    os.path.dirname(__file__), "README_with_placeholders.md"
)
README_PATH = os.path.join(ROOT_PATH, "README.md")

with open(README_WITH_PLACEHOLDERS_PATH, "r") as file:
    readme = file.read()


def get_documents_count():
    # Count of all markdown files in repo recursively
    count = 0
    for root, dirs, files in os.walk(KNOWLEDGE_BASE_PATH):
        for file in files:
            if file.endswith(".md"):
                count += 1
    return count


def get_top_level_headings_count():
    # Count of all top level headings in all markdown files in repo recursively
    count = 0
    for root, dirs, files in os.walk(KNOWLEDGE_BASE_PATH):
        for file in files:
            if not file.endswith(".md"):
                continue
            with open(os.path.join(root, file), "r") as file:
                content = file.read()
            for line in content.split("\n"):
                if line.startswith("# "):
                    count += 1
    return count


def get_reference_links_count():
    # Count of all reference links in all markdown files in repo recursively
    count = 0
    for root, dirs, files in os.walk(KNOWLEDGE_BASE_PATH):
        for file in files:
            if not file.endswith(".md"):
                continue
            with open(os.path.join(root, file), "r") as file:
                content = file.read()
            pattern = re.compile(r"\[.*?\]\(http.*?\)")
            count += len(pattern.findall(content))

    return count


def get_time_period():
    start_date = "01-06-2024"
    start_date = datetime.strptime(start_date, "%d-%m-%Y")
    end_date = datetime.now()

    diff = relativedelta(end_date, start_date)

    years = diff.years
    months = diff.months
    days = diff.days

    if years > 0:
        return f"{years} years, {months} months and {days} days"
    elif months > 0:
        return f"{months} months and {days} days"
    else:
        return f"{days} days"


PLACEHOLDER__FUNCTION_MAP = {
    "documents_count": get_documents_count,
    "top_level_headings": get_top_level_headings_count,
    "reference_links": get_reference_links_count,
    "time_period": get_time_period,
}
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
