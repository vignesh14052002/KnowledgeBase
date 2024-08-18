# Personal Knowledge base 🧠
This repository contains documentation of my learnings.

## What It Contains
- Curated distilled knowledge from areas of interest.
- Running notes, action items, and thoughts.
- Notes that I think can be publicly shared.

## Pros
- Easy knowledge sharing
    - Easy to get link for a particular folder, page, topic or a line
- Adding version control
    - helps me understand how my knowledge grows over time
- Utilizing github features
    - Markdown preview
- Utilizing VSCode features
    - Pressing dot in this page will navigate to vscode web editor
- Github Copilot Powered Note-taking (if you have subscription)

## Motive
- To practice [pressure writing](https://www.youtube.com/shorts/o8sBS0th8xQ)
- To [let it grow over time](https://youtu.be/DMlgzTUT5E0?si=Po-O2G2vAEvfi1YU)

## How to Read
- [Open this repo in vscode web editor](https://github.dev/vignesh14052002/KnowledgeBase)
- Use the search bar to find topics
- Make use of the Folder structure
- Make use of the [AI chatbot](./chatbot/README.md)
- Refer the below stats for overview

## Stats
The following items will get dynamically updated on every push to `master` branch via github actions

<table>
    <thead>
        <tr>
            <th>Section</th>
            <th>Count</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Documents</td>
            <td>42</td>
        </tr>
        <tr>
            <td>Average lines per document</td>
            <td>33</td>
        </tr>
        <tr>
            <td><details>
                    <summary>Reference Links</summary>
                    <table>
<tr><td><details><summary><a href='https://github.com'>github.com</a></summary><table>
<tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/OpenSourceContributions.md>OpenSourceContributions.md</a></td><td>7</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/AI/OpensourceProjects.md>OpensourceProjects.md</a></td><td>5</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/AI/Frameworks.md>Frameworks.md</a></td><td>4</td></tr>
</table></details></td><td>29</td></tr><tr><td><details><summary><a href='https://www.youtube.com'>youtube.com</a></summary><table>
<tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/Web/Resources.md>Resources.md</a></td><td>13</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/Web/ThinkPad.md>ThinkPad.md</a></td><td>4</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/old_notes/GameDevelopment.md>GameDevelopment.md</a></td><td>4</td></tr>
</table></details></td><td>25</td></tr><tr><td><details><summary><a href='https://youtu.be'>youtu.be</a></summary><table>
<tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/AI/Discussions.md>Discussions.md</a></td><td>6</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/Testing.md>Testing.md</a></td><td>3</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/AI/ThinkPad.md>ThinkPad.md</a></td><td>3</td></tr>
</table></details></td><td>20</td></tr><tr><td><details><summary><a href='https://python.langchain.com'>python.langchain.com</a></summary><table>
<tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/AI/Frameworks.md>Frameworks.md</a></td><td>5</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/Testing.md>Testing.md</a></td><td>2</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/AI/Retrieval.md>Retrieval.md</a></td><td>1</td></tr>
</table></details></td><td>8</td></tr><tr><td><details><summary><a href='https://reddit.com'>reddit.com</a></summary><table>
<tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/Good_blogs.md>Good_blogs.md</a></td><td>3</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/CanvasGraphics.md>CanvasGraphics.md</a></td><td>1</td></tr><tr><td><a href=https://github.com/vignesh14052002/KnowledgeBase/blob/master/knowledge_base/Web/WebsitesCollection.md>WebsitesCollection.md</a></td><td>1</td></tr>
</table></details></td><td>6</td></tr>
</table></details>
            </td>
            <td>138</td>
        </tr>
        <tr>
            <td>Time period</td>
            <td>2 months and 18 days</td>
        </tr>
    </tbody>
</table>

graph TD
    A[/Push to master branch/] --> B[Generate Stats]
    B --> C[Update Embeddings]
    C --> D[Check for file changes - git diff]
    D -->D1{If changes}
    D1 -->|Yes|E[Commit changes]
    D1 -->|No|F[/End/]
    E --> I[Push changes]
    I --> I1[/End/]
    
    M[/Generate Stats/] --> J[Read placeholders from readme template]
    J --> K[Fill the placeholders using appropriate functions]
    K --> L[Write to README.md]
    L --> L1[/End/]

        N[/Update Embeddings/] --> O[Get last embedding commit hash from /embeddings/commit_hash.txt]
    O --> P[Get the file diff from the last commit hash to the current commit hash]
    P --> Q[Get the affected filepaths from the diff]
    Q-->Q1{is any \n file affected?}
    Q1 -->|Yes| R[Delete the existing embeddings from the index where the affected filepaths matches metadata]
    Q1 -->|No| x[/End/]
    R --> S[Get the current state of these files]
    S --> T[Chunk them]
    T --> U[Embed them]
    U --> V[Insert into the index]
    V --> W[Save the current commit hash to /embeddings/commit_hash.txt]
    W --> Z[/End/]

## Contributing
please refer [CONTRIBUTING.md](./CONTRIBUTING.md) for more details