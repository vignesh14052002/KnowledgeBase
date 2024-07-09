import os
import re
import json

ROOT_PATH = os.path.join(os.path.dirname(__file__), "..")
KNOWLEDGE_BASE_PATH = os.path.join(ROOT_PATH, "knowledge_base")
GRAPH_PATH = os.path.join(ROOT_PATH, "chatbot", "client", "src", "_graph.json")

nodes = [
    {"id": "knowledge_base", "group": 4, "title": "knowledge_base"}
]  # {id:str,group:int}
edges = []  # {source:str,target:str,value:int}


def add_relpath_node(relpath, group):
    splits = relpath.split(os.sep)
    nodes.append({"id": relpath, "group": group, "title": splits[-1]})

    if len(splits) > 1:
        edges.append(
            {
                "source": os.path.join(*splits[:-1]),
                "target": relpath,
                "value": 1,
                "title": relpath,
            }
        )
    else:
        edges.append(
            {
                "source": "knowledge_base",
                "target": relpath,
                "value": 1,
                "title": relpath,
            }
        )


for root, dirs, files in os.walk(KNOWLEDGE_BASE_PATH):

    for file in files:

        print(root, dirs, file)
        if not file.endswith(".md"):
            continue
        file_path = os.path.join(root, file)
        with open(file_path, "r") as f:
            content = f.read()
        pattern = re.compile(r"\[(.*?)\]\((http.*?)\)")
        hyperlinks = pattern.findall(content)

        relpath = os.path.relpath(file_path, KNOWLEDGE_BASE_PATH)

        for hyperlink in hyperlinks:
            link_title, link = hyperlink
            if not any(x["id"] == link for x in nodes):
                nodes.append({"id": link, "group": 1, "title": link_title})

            edges.append(
                {"source": relpath, "target": link, "value": 1, "title": link_title}
            )

        add_relpath_node(relpath, 2)

    dir_relpath = os.path.relpath(root, KNOWLEDGE_BASE_PATH)
    if dir_relpath != ".":
        add_relpath_node(dir_relpath, 3)

with open(GRAPH_PATH, "w") as file:
    json.dump({"nodes": nodes, "links": edges}, file, indent=4)
