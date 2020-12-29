import { useState, createContext } from 'react'
import './App.css'

import useTree from './useTree'
import TreeNode from './TreeNode'

export const TreeContext = createContext(null)

function App() {
  const [rootText, setRootText] = useState('')
  const treeManager = useTree()

  const { nodes } = treeManager.tree

  return (
    <TreeContext.Provider value={treeManager}>
      <div className="app">
        {nodes ? (
          <div className="tree-nodes">
            {nodes.map(node => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>
        ) : (
          <input
            type="text"
            placeholder="Enter root text"
            value={rootText}
            onChange={e => setRootText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && treeManager.actions.initializeRoot(rootText)}
          />
        )}
      </div>
    </TreeContext.Provider>
  )
}

export default App
