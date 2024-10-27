import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { v4 as uuidv4 } from "uuid";
import { TreeItem2, TreeItem2Label } from "@mui/x-tree-view/TreeItem2";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import IconButton from "@mui/material/IconButton";

let decision_tree_data = {};
function buildTree(node_id) {
  if (!node_id || !Object.keys(decision_tree_data).includes(node_id)) return;

  const node = decision_tree_data[node_id];
  let label = [];
  if (node.solution) label.push(node.solution);
  if (node.question) label.push(node.question);
  if (node.title) label.push(node.title);
  const _node = {
    ...node,
    id: node_id,
    label: label.join("\n"),
    children: [],
  };
  if (node.choices) {
    return {
      ..._node,
      children: node.choices.map((choice) => {
        return {
          id: uuidv4(),
          label: choice.choice,
          children: [buildTree(choice.next.toString())].filter(
            (e) => e !== undefined
          ),
        };
      }),
    };
  }
  if (node.stages) {
    return {
      ..._node,
      children: node.stages.map((stage) => {
        return {
          id: uuidv4(),
          label: stage.stage,
          children: [buildTree(stage.next?.toString())].filter(
            (e) => e !== undefined
          ),
        };
      }),
    };
  }
  return _node;
}
function CustomLabel(props) {
  const { children, ...other } = props;
  return (
    <TreeItem2Label {...other}>
      {children.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </TreeItem2Label>
  );
}
const CustomTreeItem = React.forwardRef((props, ref) => {
  return (
    <TreeItem2
      ref={ref}
      {...props}
      slots={{
        label: CustomLabel,
      }}
    />
  );
});

function get_mermaid_id(text) {
  const id = text.replace(/[^a-zA-Z0-9]/g, "_");
  return `${id}[${text}]`;
}
function get_mermaid_text(nodes) {
  let mermaid_texts = ["graph TD"];
  let last_id = null;
  nodes.forEach((node) => {
    console.log("here", node);
    if (!node.block) {
      return;
    }
    let node_text = get_mermaid_id(node.block.text);
    if (node.block.type === "replace") {
      if (mermaid_texts.length > 1) {
        const last_line = mermaid_texts.pop();
        last_id = last_line.split("-->")[0].trim();
      }
    }
    if (!last_id) {
      mermaid_texts.push(node_text);
    } else {
      mermaid_texts.push(`${last_id} --> ${node_text}\n`);
      last_id = node_text;
    }
  });
  if (mermaid_texts.length == 1) {
    return "";
  }
  console.log(mermaid_texts.join("\n"));
  return mermaid_texts.join("\n");
}
export default function DecisionTree() {
  const [expandedItems, setExpandedItems] = React.useState([]);
  const [decisionTreeData, setDecisionTreeData] = React.useState([]);
  const [current_node, setCurrentNode] = React.useState(null);
  const [solution_path, setSolutionPath] = React.useState([]);
  const [questionView, setQuestionView] = React.useState("one_by_one");

  const toggleView = () => {
    if (questionView === "one_by_one") {
      setQuestionView("tree");
    } else {
      setQuestionView("one_by_one");
    }
  };

  const getAllItemsWithChildrenItemIds = () => {
    const itemIds = [];
    const registerItemId = (item) => {
      if (item.children?.length) {
        itemIds.push(item.id);
        item.children.forEach(registerItemId);
      }
    };

    decisionTreeData.forEach(registerItemId);

    return itemIds;
  };
  React.useEffect(() => {
    //fetch("https://raw.githubusercontent.com/vignesh14052002/KnowledgeBase/master/knowledge_base/AI/decision_tree.json")
    fetch("./decision_tree.json")
      .then((response) => response.json())
      .then((data) => {
        decision_tree_data = data;
        console.log(data);
        const root_node = buildTree("1");
        setDecisionTreeData([root_node]);
        setCurrentNode(root_node);
      });
  }, []);

  const handleExpandedItemsChange = (event, itemIds) => {
    setExpandedItems(itemIds);
  };

  const handleExpandClick = () => {
    setExpandedItems((oldExpanded) =>
      oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : []
    );
  };
  const handleOnChoiceClick = (choice) => {
    setCurrentNode(choice.children[0]);
    const new_solution = [...solution_path, choice.children[0]];
    setSolutionPath(new_solution);
    const mermaidElement = document.getElementById("mermaid");
    if (mermaidElement) {
      mermaidElement.innerHTML = get_mermaid_text(new_solution);
      mermaidElement.removeAttribute("data-processed");
      window.mermaid.init(undefined, mermaidElement);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ position: "fixed", bottom: "10px", left: "10px" }}>
        <IconButton onClick={toggleView}>
          {questionView === "one_by_one" && <AccountTreeIcon />}
          {questionView === "tree" && <FormatAlignCenterIcon />}
        </IconButton>
      </Box>
      {questionView === "one_by_one" && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          width="50%"
        >
          {current_node && (
            <Box margin="10px">
              {(current_node.solution || current_node.title) && (
                <Paper
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    backgroundColor: "#cff7d7 !important",
                  }}
                  variant="outlined"
                  elevation={1}
                  style={{ padding: "10px" }}
                >
                  <TipsAndUpdatesIcon />
                  <Typography
                    variant="h5"
                    flexGrow="1"
                    margin="auto"
                    textAlign="center"
                  >
                    {current_node.solution || current_node.title}
                  </Typography>
                </Paper>
              )}
              <Typography
                textAlign="center"
                sx={{ marginBottom: "20px" }}
                variant="h4"
              >
                {current_node.question}
              </Typography>

              <Box display="flex" flexDirection="column">
                {current_node.children.map((child) => (
                  <Button
                    color="inherit"
                    key={child.id}
                    onClick={() => handleOnChoiceClick(child)}
                  >
                    {child.label}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
      {questionView === "tree" && (
        <Box minHeight="100vh" width="50%">
          <Box>
            <Button onClick={handleExpandClick}>
              {expandedItems.length === 0 ? "Expand all" : "Collapse all"}
            </Button>
          </Box>
          <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <RichTreeView
              items={decisionTreeData}
              slots={{ item: CustomTreeItem }}
              expandedItems={expandedItems}
              onExpandedItemsChange={handleExpandedItemsChange}
            />
          </Box>
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        width="50%"
        sx={{ borderLeft: "2px solid grey" }}
      >
        {questionView === "tree" && (
          <h3>Block diagram not supported in tree view</h3>
        )}
        <pre id="mermaid" style={{display:questionView === "one_by_one"?"block":"none"}}></pre>
      </Box>
    </Box>
  );
}
