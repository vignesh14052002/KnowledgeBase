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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from "@mui/material/IconButton";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {styled} from "@mui/system";
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { getParameters } from "codesandbox/lib/api/define";
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import "./DecisionTree.css"

const parameters = getParameters({
  files: {
    "index.js": {
      content: "console.log('hello')"
    },
    "package.json": {
      content: { dependencies: {} }
    }
  }
});
let url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
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
    id: uuidv4(),
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
          children: [buildTree(choice.next?.toString())].filter(
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
          ...stage,
          id: uuidv4(),
          label: stage.stage,
          children: [buildTree(stage.next?.toString())].filter(
            (e) => e !== undefined
          ),
        };
      }),
    };
  }
  if (node.next){
    return {
      ..._node,
      children: [buildTree(node.next.toString())].filter(
        (e) => e !== undefined
      ),
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
  if (text.includes("[") && text.includes("]")) return text;
  const id = text.replace(/[^a-zA-Z0-9]/g, "_");
  if (id==text) return text;
  return `${id}[${text}]`;
}
function get_mermaid_text(nodes) {
  let mermaid_texts = ["graph TD"];
  let last_id = null;
  function update_text(node){
    if (!node.block) {
      return
    }
    let node_text = get_mermaid_id(node.block.text);
    if (node.block.type === "replace") {
      if (mermaid_texts.length > 1) {
        const last_line = mermaid_texts.pop();
        if (last_line.includes("-->")) {
          last_id = last_line.split("-->")[0].trim();
        }else{
          last_id = null;
        }
      }
    }
    if (node.block.parent){
      last_id = get_mermaid_id(node.block.parent);
    }
    if (!last_id) {
      mermaid_texts.push(node_text);
      last_id = node_text;
      return
    }
    mermaid_texts.push(`${last_id} --> ${node_text}\n`);
    last_id = node_text;
  
  }
  nodes.forEach((node) => {
    console.log("here", node);
    if (node.block && node.stages){
      const first_child = node.children[0];
      if (node.children[0].block){
        const last_item = mermaid_texts[mermaid_texts.length-1];
        if (last_item.includes("-->")){
          first_child.block.parent = last_item.split("-->")[1].trim();
        }
        else{
          first_child.block.parent = last_item;
        }
      }
      update_text(first_child);
      mermaid_texts.push(`subgraph ${get_mermaid_id(node.block.text)}`);
      // start from second child
      node.children.slice(1).forEach((child) => {
        update_text(child);
      });
      mermaid_texts.push("end");
    }
    else{
      update_text(node)
    }
  });
  if (mermaid_texts.length == 1) {
    return "";
  }
  console.log(mermaid_texts.join("\n"));
  return mermaid_texts.join("\n");
}


const GlowingButton = styled(IconButton)(({ theme, is_clicked }) => ({
  color: is_clicked ? '#8076c8' : 'default',
}));
let root_node = null

const uiLayout = Object.freeze(
  {
    WITHOUT_CODE_EDITOR:"without editor",
    WITH_CODE_EDITOR:"with code editor"
  }
)
export default function DecisionTree() {
  const [expandedItems, setExpandedItems] = React.useState([]);
  const [decisionTreeData, setDecisionTreeData] = React.useState([]);
  const [nodeStack, setNodeStack] = React.useState([]);
  const [solution_path, setSolutionPath] = React.useState([]);
  const [questionView, setQuestionView] = React.useState("one_by_one");
  const [useAI, setUseAI] = React.useState(false);
  const [architectureDiagram, setArchitectureDiagram] = React.useState("graph TD");
  const [chat_history, setChatHistory] = React.useState([]);
  const [layout,setLayout] = React.useState(uiLayout.WITHOUT_CODE_EDITOR);
  const [codeSandboxUrl, setCodeSandboxUrl] = React.useState(url);

  const [stateHistory, setStateHistory] = React.useState([]);
  const [currentIndexInHistory, setCurrentIndexInHistory] = React.useState(0);

  function handleUpdateUrl(solution){
    const mermaid_text = get_mermaid_text(solution)
    fetch("http://localhost:8000/v1/solution-builder/get-code-sandbox-template",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_name:"react-ai-chatbot"
      }),
    }
    )
    .then((response) => response.json())
    .then((data) => {
      fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ parameters:getParameters(data) })
  }).then(response=>response.json()).then(data=>{
      // const paramseters = 
      console.log(data)
      const url = `https://codesandbox.io/p/sandbox/${data.sandbox_id}`;
      setCodeSandboxUrl(url)
  })
    })
  }

  const toggleView = () => {
    if (questionView === "one_by_one") {
      setQuestionView("tree");
    } else {
      setQuestionView("one_by_one");
    }
  };

  const toggleCodeEditor = () => {
    if (layout === uiLayout.WITHOUT_CODE_EDITOR) {
      setLayout(uiLayout.WITH_CODE_EDITOR)
    } else {
      setLayout(uiLayout.WITHOUT_CODE_EDITOR)
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

  function reset_root_node(root_node){
    setDecisionTreeData([root_node]);
    setNodeStack([root_node]);
    setStateHistory([{nodeStack: [root_node], solutionPath: []}]);
    setCurrentIndexInHistory(0);
  }
  React.useEffect(() => {
    //fetch("https://raw.githubusercontent.com/vignesh14052002/KnowledgeBase/master/knowledge_base/AI/decision_tree.json")
    fetch("./decision_tree.json")
      .then((response) => response.json())
      .then((data) => {
        decision_tree_data = data;
        console.log(data);
        root_node = buildTree("1");
        reset_root_node(root_node);
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

  const handleOnChoiceClickAI = (choice) => {
      const c_node = nodeStack[nodeStack.length - 1];
      const newNodeStack = [...nodeStack.slice(0,-1)];
      setNodeStack(newNodeStack);
      const newChatHistory = [...chat_history, {
        question: c_node.question,
        choices: c_node.children.map((child) => child.label),
        answer: choice.label,
      }]
      setChatHistory(newChatHistory);
      fetch("/v1/solution-builder/get-question",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: newChatHistory,
          architecture: architectureDiagram,
        }),
      }
      )
      .then((response) => response.json())
      .then((data) => {
        const new_node = {
          id: uuidv4(),
          question: data["next_question"],
          children: data["choices"].map((choice) => {
            return {
              id: uuidv4(),
              label: choice,
            };
          }),
        }
        console.log("response",data);
        setNodeStack([...newNodeStack, new_node]);
        const updated_architecture = data["updated_architecture"];

        setArchitectureDiagram(updated_architecture);
        updateDiagram(updated_architecture)
      })

  }
  const updateDiagram = (text)=>{
    const mermaidElement = document.getElementById("mermaid");
    if (mermaidElement) {
      mermaidElement.innerHTML = text
      mermaidElement.removeAttribute("data-processed");
      window.mermaid.init(undefined, mermaidElement);
    }
  }
  const handleOnChoiceClick = (choice) => {
    if (useAI){
      handleOnChoiceClickAI(choice);
      return;
    }
    let children = [choice.children[0]]
    const child = children[0];
    if (!child && popNodeStackOnInvalidNode(child)) {
      alert("Next question not available for selected choice, switching to next block ");
      return;
    }
    let new_solution = [...solution_path];
    if (child.stages){
      children = []
      child.children.slice().reverse().forEach((stage) => {
        if (stage.children){
          children.push(...stage.children)
        }
      }
      )
      if (children.length >0 && !children[0].solution && child.solution){
        children[0].solution = child.solution;
      }
      new_solution.push(child)
    }
    else if (child.children.length == 1 && child.children[0].stages){
      children = []
      child.children[0].children.slice().reverse().forEach((stage) => {
        if (stage.children){
          children.push(...stage.children)
        }
      }
      )
      if (children.length >0 && !children[0].solution && child.solution){
        children[0].solution = child.solution;
      }
      new_solution.push(child.children[0])
    }
    else{

      if (!child.question && child.children.length > 0){
       children = child.children;
       if (child.solution){
         children[0].solution = child.solution;
       } 
      }
      new_solution.push(...children);
    }
    const new_node_stack = [...nodeStack.slice(0,-1), ...children];
    setNodeStack(new_node_stack);
    setSolutionPath(new_solution);
    handleUpdateUrl(new_solution);
    const new_architecture = get_mermaid_text(new_solution);
    setArchitectureDiagram(new_architecture);
    updateDiagram(new_architecture);
    const newHistory = [...stateHistory.slice(0,currentIndexInHistory+1), {nodeStack: new_node_stack, solutionPath: new_solution}];
    setStateHistory(newHistory);
    setCurrentIndexInHistory(newHistory.length - 1);
  };

  const goBackInHistory = () => {
    if (currentIndexInHistory == 0) return;
    const newIndex = currentIndexInHistory - 1;
    updateHistory(newIndex);
  }
  const goForwardInHistory = () => {
    if (currentIndexInHistory == stateHistory.length - 1) return;
    const newIndex = currentIndexInHistory + 1;
    updateHistory(newIndex);
  }
  const updateHistory = (index)=>{
    setCurrentIndexInHistory(index);
    const newHistory = stateHistory[index];
    setNodeStack(newHistory.nodeStack);
    setSolutionPath(newHistory.solutionPath);
    const new_architecture = get_mermaid_text(newHistory.solutionPath);
    setArchitectureDiagram(new_architecture);
    updateDiagram(new_architecture);
  }
  const popNodeStackOnInvalidNode = (current_node)=>{
    if (nodeStack.length>1 && !current_node?.children?.length>0){
      setNodeStack([...nodeStack.slice(0,-1)]);
      return true;
    }
    return false;
  }
  const current_node = nodeStack.length>0?nodeStack[nodeStack.length - 1]:null;
  popNodeStackOnInvalidNode(current_node);

  return (
    <Box className={layout === uiLayout.WITHOUT_CODE_EDITOR?"container-without-code-editor":"container"} sx={{ display: "flex" }} minHeight="100vh" minWidth="100vw">
      
      <Box sx={{ position: "fixed", bottom: "10px", left: "10px" }}>
        <IconButton onClick={toggleView}>
          {questionView === "one_by_one" && <AccountTreeIcon />}
          {questionView === "tree" && <FormatAlignCenterIcon />}
        </IconButton>
      </Box>
      <Box sx={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <IconButton onClick={toggleCodeEditor} style={{backgroundColor:layout === uiLayout.WITH_CODE_EDITOR?"white":"inherit"}}>
          {layout===uiLayout.WITH_CODE_EDITOR && <CodeOffIcon/>}
          {layout===uiLayout.WITHOUT_CODE_EDITOR && <CodeIcon/>}
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: layout === uiLayout.WITHOUT_CODE_EDITOR?"row":"column", flexGrow:1 }}>
      {questionView === "one_by_one" && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          maxWidth="50vw"
        >
           <Box sx={{ position: "fixed", top: "10px", left: "10px" }}>
            <Tooltip title="Use AI">
            <GlowingButton  is_clicked={useAI?1:0} onClick={()=>{
              setUseAI(!useAI);
              reset_root_node(root_node);
            }
        }>
      <AutoAwesomeIcon />
      </GlowingButton>
      </Tooltip>
      </Box>
          {!current_node && useAI && (
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h5">Preparing next question for you...</Typography>
            <CircularProgress />
          </Box>
          )}
          {current_node && !useAI && (
            <Box sx={{ display: 'flex', position:'absolute', width:'50%', justifyContent:'space-between' }}>
              <Box>
              <IconButton onClick={goBackInHistory} sx={{ display: currentIndexInHistory>=1?'inline-block':'none'}}>
                <ArrowBackIosIcon />
              </IconButton>
              </Box>
              <Box>
              <IconButton onClick={goForwardInHistory} sx={{ display: currentIndexInHistory < stateHistory.length - 1?'inline-block':'none'}}>
                <ArrowForwardIosIcon />
              </IconButton>
              </Box>
            </Box>
            )}
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
        flexGrow={1}
        maxWidth="50vw"
        sx={{ borderLeft: "2px solid grey" }}
        className="diagram"
      >
        {questionView === "tree" && (
          <h3>Block diagram not supported in tree view</h3>
        )}
        <pre id="mermaid" style={{display:questionView === "one_by_one"?"block":"none"}}></pre>
      </Box>
      </Box>
      {layout === uiLayout.WITH_CODE_EDITOR && 
      <iframe style={{width:"100%"}} src={codeSandboxUrl}></iframe>}
    </Box>
  );
}
