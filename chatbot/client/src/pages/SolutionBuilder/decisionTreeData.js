import { v4 as uuidv4 } from "uuid";

export function buildTreeFromData(data) {
  return buildTree("start",data);
}

function buildTree(node_id,decision_tree_data) {
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
          children: [buildTree(choice.next?.toString(),decision_tree_data)].filter(
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
          children: [buildTree(stage.next?.toString(),decision_tree_data)].filter(
            (e) => e !== undefined
          ),
        };
      }),
    };
  }
  if (node.next) {
    return {
      ..._node,
      children: [buildTree(node.next.toString(),decision_tree_data)].filter(
        (e) => e !== undefined
      ),
    };
  }
  return _node;
}
export function calculateDepths(node, currentDepth = 0, offset = 0) {
  // Set the current node depth
  node.depth = currentDepth;

  if (node.children.length === 0) {
    // If the node is a leaf, its longest leaf node depth is its own depth
    node.longestLeafNodeDepth = currentDepth + offset;
    return currentDepth;
  }
  // Recurse into children to get their longestLeafNodeDepth
  let maxDepth = currentDepth;
  const offsetArray = [];
  node.children.forEach(child => {
    const childLongestLeafDepth = calculateDepths(child, currentDepth + (node.question ? 1 : 0), offset);
    if (!node.stages) {
      maxDepth = Math.max(childLongestLeafDepth, maxDepth);
    }
    else {
      const _offset = childLongestLeafDepth - currentDepth;
      offsetArray.push(_offset);
      const stageLongestLeafDepth = calculateDepths(child, currentDepth + (node.question ? 1 : 0), _offset + offset);
      maxDepth = Math.max(stageLongestLeafDepth, maxDepth);
      maxDepth += _offset;
    }
  });
  node.longestLeafNodeDepth = maxDepth + offset;
  return maxDepth;
}
