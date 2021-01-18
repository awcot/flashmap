import { useReducer } from 'react'

const ROOT = {
  id: 0,
  children: []
}

const BLANK_NODE = {
  id: undefined,
  children: []
}

const BLANK_DATA = {
  name: '',
  question: '',
  answer: ''
}

const BLANK_INITIAL_STATE = {
  id: 0,
  selectedId: 0,
  tree: ROOT,
  nodeData: { 0: { name: '' } }
}

const addChild = (subtree, parentId, newNode) => {
  if (subtree.id === parentId) return {
    ...subtree,
    children: [
      ...subtree.children,
      newNode
    ]
  }
  if (!subtree.children.length) return subtree

  return {
    ...subtree,
    children: subtree.children.map(c => addChild(c, parentId, newNode))
  }
}

const deleteSubtree = (subtree, id) => {
  if (!subtree.children.length) return subtree
  const index = subtree.children.findIndex(c => c.id === id)
  if (index >= 0) {
    return {
      ...subtree,
      children: [
        ...subtree.children.slice(0, index),
        ...subtree.children.slice(index + 1)
      ]
    }
  } else {
    return {
      ...subtree,
      children: subtree.children.map(c => deleteSubtree(c, id))
    }
  }
}

const treeReducer = (state, action) => {
  switch (action.type) {
    case 'add-node': {
      const { parentId } = action
      const id = state.id + 1
      const newNode = { ...BLANK_NODE, id }
      const tree = addChild(state.tree, parentId, newNode)
      const nodeData = { ...state.nodeData, [id]: BLANK_DATA }

      return { ...state, tree, id, nodeData }
    }
    case 'save-node': {
      const { id, data } = action
      const nodeData = {
        ...state.nodeData,
        [id]: data
      }

      return { ...state, nodeData }
    }
    case 'delete-node': {
      const { id, children } = action
      const tree = deleteSubtree(state.tree, id)
      const nodeData = { ...state.nodeData }
      children.forEach(c => delete nodeData[c.id])
      delete nodeData[id]

      return { ...state, tree, nodeData }
    }
    default:
      return state
  }
}

function useTree() {
  const [state, dispatch] = useReducer(treeReducer, BLANK_INITIAL_STATE)

  const actions = {
    addNode: (parentId) => dispatch({ type: 'add-node', parentId }),
    saveNode: (id, data) => dispatch({ type: 'save-node', id, data }),
    deleteNode: ({ id, children }) => (
      dispatch({ type: 'delete-node', id, children })
    ),
  }

  return { state, dispatch, actions }
}

export default useTree
