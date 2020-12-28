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

function useTree(rootText = '') {
  // TODO: memoize/check performance implications of this
  const rootNode = { ...ROOT, data: { ...ROOT.data, text: rootText } }
  const initialState = { ...BLANK_INITIAL_STATE, nodes: [rootNode] }
  const [tree, dispatch] = useReducer(treeReducer, initialState)

  const actions = {
    addNode: (parentId, data) => dispatch({ type: 'add-node', parentId, data })
  }

  return { tree, dispatch, actions }
}

export default useTree
