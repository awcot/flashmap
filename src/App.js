import { createContext } from 'react'
import './App.css'

import useTree from './useTree'
import TreeNode from './TreeNode'
import TreeNodeForm from './TreeNodeForm'

export const TreeContext = createContext(null)

function App() {
  const treeManager = useTree()

  const { nodes } = treeManager.tree

  return (
    <TreeContext.Provider value={treeManager}>
      <div className="app">
        {nodes && (
          <div className="tree-nodes">
            {nodes.map(node => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>
        )}
        <TreeNodeForm />
      </div>
    </TreeContext.Provider>
  )
}

export default App
