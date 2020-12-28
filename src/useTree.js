import { useReducer } from 'react'

const ROOT = {
  id: 0,
  parentId: null,
  data: {
    text: '',
    question: '',
    answer: ''
  },
  children: []
}

const BLANK_INITIAL_STATE = {
  id: 0,
  nodes: undefined
}

const treeReducer = (state, action) => {
  switch (action.type) {
    case 'initialize-root': {
      const { rootText } = action
      const root = { ...ROOT, data: { ...ROOT.data, text: rootText } }

      return { ...BLANK_INITIAL_STATE, nodes: [root] }
    }
    case 'add-node': {
      const { parentId, data } = action

      const id = state.id + 1
      const nodes = state.nodes.map((node) => {
        if (node.id !== parentId) return node // see if `node` is necessary here

        return { ...node, children: [...node.children, id] }
      })

      const newNode = {
        id,
        parentId,
        data,
        children: []
      }

      return { id, nodes: [...nodes, newNode] }
    }
    default:
      return state
  }
}

function useTree() {
  const [tree, dispatch] = useReducer(treeReducer, BLANK_INITIAL_STATE)

  const actions = {
    initializeRoot: (rootText) => dispatch({ type: 'initialize-root', rootText }),
    addNode: (parentId, data) => dispatch({ type: 'add-node', parentId, data }),
  }

  return { tree, dispatch, actions }
}

export default useTree
