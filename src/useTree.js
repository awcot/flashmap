import { useReducer } from 'react'

const ROOT = {
  id: 0,
  parentId: null,
  data: {
    text: '',
  },
  children: []
}

const BLANK_NODE = {
  id: undefined,
  parentId: undefined,
  data: {
    text: '',
    question: '',
    answer: '',
  },
  children: []
}

const BLANK_INITIAL_STATE = {
  id: 0,
  selectedId: 0,
  nodes: [ROOT]
}

const treeReducer = (state, action) => {
  switch (action.type) {
    case 'add-node': {
      const { parentId } = action

      const id = state.id + 1
      const nodes = state.nodes.map((node) => {
        if (node.id !== parentId) return node // TODO see if `node` is necessary here

        return { ...node, children: [...node.children, id] }
      })

      const newNode = { ...BLANK_NODE, id, parentId }

      return { ...state, id, selectedId: id, nodes: [...nodes, newNode] }
    }
    case 'save-node': {
      const { id, data } = action
      const nodes = state.nodes.map((node) => {
        if (node.id !== id) return node // TODO see if `node` is necessary here

        return { ...node, data }
      })

      return { ...state, selectedId: null, nodes }
    }
    case 'select-node': {
      return { ...state, selectedId: action.id }
    }
    default:
      return state
  }
}

function useTree() {
  const [tree, dispatch] = useReducer(treeReducer, BLANK_INITIAL_STATE)

  const actions = {
    addNode: (parentId) => dispatch({ type: 'add-node', parentId }),
    saveNode: (id, data) => dispatch({ type: 'save-node', id, data }),
    selectNode: (id) => dispatch({ type: 'select-node', id }),
  }

  return { tree, dispatch, actions }
}

export default useTree
