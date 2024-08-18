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
            <td>!@(documents_count)</td>
        </tr>
        <tr>
            <td>Average lines per document</td>
            <td>!@(average_lines_per_document)</td>
        </tr>
        <tr>
            <td><details>
                    <summary>Reference Links</summary>
                    !@(top_reference_sites_table)</details>
            </td>
            <td>!@(reference_links)</td>
        </tr>
        <tr>
            <td>Time period</td>
            <td>!@(time_period)</td>
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