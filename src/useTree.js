import { useReducer } from 'react'

// const TEST_DATA = {
//   name: 'JavaScript',
//   children: [
//     {
//       name: 'Functions',
//       children: [],
//     },
//     {
//       name: 'Numbers',
//       children: [],
//     },
//     {
//       name: 'Strings',
//       children: [
//         {
//           name: 'The toString() function'
//         }
//       ],
//     },
//     {
//       name: 'Objects',
//       children: [
//         {
//           name: 'Constructing them',
//           children: [],
//         },
//         {
//           name: 'Prototypical inheritance',
//           children: [],
//         },
//       ],
//     },
//   ]
// }

const ROOT = {
  id: 0,
  text: {
    name: '',
  },
  children: []
}

const BLANK_NODE = {
  id: undefined,
  text: {
    name: '',
    question: '',
    answer: ''
  },
  children: []
}

const BLANK_INITIAL_STATE = {
  id: 0,
  selectedId: 0,
  tree: { ...ROOT }
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

const treeReducer = (state, action) => {
  switch (action.type) {
    case 'add-node': {
      const { parentId } = action
      const id = state.id + 1
      const newNode = { ...BLANK_NODE, id }
      const tree = addChild(state.tree, parentId, newNode)
      return { ...state, tree, id }
    }
    case 'save-node': {
      const { id, data } = action
      const nodes = state.nodes.map((node) => {
        if (node.id !== id) return node

        return { ...node, text: data }
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
  const [state, dispatch] = useReducer(treeReducer, BLANK_INITIAL_STATE)

  const actions = {
    addNode: (parentId) => dispatch({ type: 'add-node', parentId }),
    saveNode: (id, data) => dispatch({ type: 'save-node', id, data }),
    selectNode: (id) => dispatch({ type: 'select-node', id }),
  }

  return { state, dispatch, actions }
}

export default useTree
