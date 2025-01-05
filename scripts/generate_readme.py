import os
import re
from datetime import datetime

ROOT_PATH = os.path.join(os.path.dirname(__file__), "..")
KNOWLEDGE_BASE_PATH = os.path.join(ROOT_PATH, "knowledge_base")
REPO_KNOWLEDGE_BASE_PATH = (
    r"https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/"
)
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


def get_average_lines_per_document():
    # Average number of lines in all markdown files in repo recursively
    count = 0
    total_lines = 0
    for root, dirs, files in os.walk(KNOWLEDGE_BASE_PATH):
        for file in files:
            if not file.endswith(".md"):
                continue
            with open(os.path.join(root, file), "r") as file:
                content = file.read()
            lines = content.split("\n")
            total_lines += len(lines)
            count += 1
    return total_lines // count


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


def get_site_count_in_file_table(files):
    file_items = sorted(files.items(), key=lambda x: x[1]["count"], reverse=True)
    return f"""<table>
{"".join([f"<tr><td><a href={count['file_link']}>{file}</a></td><td>{count['count']}</td></tr>" for file, count in file_items[:3]])}
</table>"""


def get_top_reference_site_table():
    site_count = {}
    for root, dirs, files in os.walk(KNOWLEDGE_BASE_PATH):
        for file in files:
            if not file.endswith(".md"):
                continue
            with open(os.path.join(root, file), "r") as _file:
                content = _file.read()
            pattern = re.compile(r"https?://(www\.)?(\w+\.\w+(\.\w+)?)")
            for site in pattern.finditer(content):
                site_link = site.group(0)
                site = site.group(2)
                file_name = os.path.basename(file)
                relative_path = os.path.relpath(
                    os.path.join(root, file), KNOWLEDGE_BASE_PATH
                )
                repo_file_path = os.path.join(
                    REPO_KNOWLEDGE_BASE_PATH, relative_path.replace("\\", "/")
                )
                if not site_count.get(site):
                    site_count[site] = {
                        "count": 0,
                        "files": {file_name: {"count": 0, "file_link": repo_file_path}},
                        "link": site_link,
                    }
                if not site_count[site]["files"].get(file_name):
                    site_count[site]["files"][file_name] = {
                        "count": 0,
                        "file_link": repo_file_path,
                    }

                site_count[site]["count"] += 1
                site_count[site]["files"][file_name]["count"] += 1

    site_count = dict(
        sorted(site_count.items(), key=lambda x: x[1]["count"], reverse=True)
    )

    table = f"""<table>
{"".join([f"<tr><td><details><summary><a href='{count['link']}'>{site}</a></summary>{get_site_count_in_file_table(count['files'])}</details></td><td>{count['count']}</td></tr>" for site, count in list(site_count.items())[:5]])}
</table>"""
    return table


def get_time_period():
    start_date = "01-06-2024"
    start_date = datetime.strptime(start_date, "%d-%m-%Y")
    end_date = datetime.now()

    delta = end_date - start_date
    days = delta.days

    years, days = divmod(days, 365)
    months, days = divmod(days, 30)

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
    "average_lines_per_document": get_average_lines_per_document,
    "top_reference_sites_table": get_top_reference_site_table,
}
PLACEHOLDER_PATTERN = re.compile(r"!\@\((.*?)\)")

# Update relative paths
readme = readme.replace("../", "./")

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
