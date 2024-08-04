import * as React from 'react';
import Box from '@mui/material/Box';

import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { v4 as uuidv4 } from 'uuid';
import { TreeItem2, TreeItem2Label } from '@mui/x-tree-view/TreeItem2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

let decision_tree_data = {}
function buildTree(node_id){
    if (!node_id || !Object.keys(decision_tree_data).includes(node_id))return;

  const node = decision_tree_data[node_id];
  let label = [];
  if (node.solution)label.push(node.solution);  
  if (node.question)label.push(node.question);
  if (node.title)label.push(node.title);
  const _node = {
    id: node_id,
    label: label.join("\n"),
    children: []
  }
    if (node.choices){
        return {
            ..._node,
        children: node.choices.map(choice => {return {
            id: uuidv4(),
            label:choice.choice,
            children:[buildTree(choice.next.toString())].filter(e=>e!==undefined)
        }})
    }
}
    if (node.stages){
        return {
            ..._node,
          children: node.stages.map(stage => {return {
            id: uuidv4(),
            label:stage.stage,
            children:[buildTree(stage.next?.toString())].filter(e=>e!==undefined)
        }})
        }
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
        label: CustomLabel
      }}
    />
  )
});

  
export default function DecisionTree() {
    const [expandedItems, setExpandedItems] = React.useState([]);
    const [decisionTreeData, setDecisionTreeData] = React.useState([]);
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
      fetch("https://raw.githubusercontent.com/vignesh14052002/KnowledgeBase/master/knowledge_base/AI/decision_tree.json")
      .then(response => response.json())
      .then(data => {
        decision_tree_data = data;
        console.log(data);
        setDecisionTreeData([buildTree("1")]);
      })
    }, []);

    const handleExpandedItemsChange = (event, itemIds) => {
      setExpandedItems(itemIds);
    };
  
    const handleExpandClick = () => {
      setExpandedItems((oldExpanded) =>
        oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : [],
      );
    };
  return (
    <Stack spacing={2}>
      <div>
        <Button onClick={handleExpandClick}>
          {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </div>
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <RichTreeView 
      items={decisionTreeData} 
      slots={{item:CustomTreeItem}}
      expandedItems={expandedItems}
    onExpandedItemsChange={handleExpandedItemsChange}
        />
    </Box>
    </Stack>
  );
}