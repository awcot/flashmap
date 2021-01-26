import { useReducer } from "react";

const BLANK_NODE = {
  id: undefined,
  text: {
    name: "",
    question: "",
    answer: "",
  },
  children: [],
};

const BLANK_INITIAL_STATE = {
  id: 0,
  selectedId: 0,
  tree: {
    id: 0,
    text: {
      name: "",
    },
    children: [],
  },
};

const addChild = (subtree, parentId, newNode) => {
  if (subtree.id === parentId)
    return {
      ...subtree,
      children: [...subtree.children, newNode],
    };
  if (!subtree.children.length) return subtree;
  return {
    ...subtree,
    children: subtree.children.map((c) => addChild(c, parentId, newNode)),
  };
};

const updateNode = (subtree, id, data) => {
  if (subtree.id === id) {
    return {
      ...subtree,
      text: { ...data },
    };
  }
  if (!subtree.children.length) return subtree;
  return {
    ...subtree,
    children: subtree.children.map((c) => updateNode(c, id, data)),
  };
};

const deleteSubtree = (subtree, id) => {
  if (!subtree.children.length) return subtree;
  const index = subtree.children.findIndex((c) => c.id === id);
  if (index >= 0) {
    return {
      ...subtree,
      children: [
        ...subtree.children.slice(0, index),
        ...subtree.children.slice(index + 1),
      ],
    };
  }
  return {
    ...subtree,
    children: subtree.children.map((c) => deleteSubtree(c, id)),
  };
};

const treeReducer = (state, action) => {
  switch (action.type) {
    case "add-node": {
      const { parentId } = action;
      const id = state.id + 1;
      const newNode = { ...BLANK_NODE, id };
      const tree = addChild(state.tree, parentId, newNode);

      return { ...state, id, tree };
    }
    case "update-node": {
      const { id, data } = action;
      const tree = updateNode(state.tree, id, data);

      return { ...state, tree };
    }
    case "delete-node": {
      const { id } = action;
      const tree = deleteSubtree(state.tree, id);

      return { ...state, tree };
    }
    default:
      return state;
  }
};

function useTree() {
  const [state, dispatch] = useReducer(treeReducer, BLANK_INITIAL_STATE);

  return { state, dispatch };
}

export default useTree;
