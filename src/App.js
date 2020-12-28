import { useState, createContext } from 'react'
import './App.css'

import useTree from './useTree'
import Vertex from './Vertex'

export const TreeContext = createContext(null)

function App() {
  const [rootText, setRootText] = useState('')
  const treeManager = useTree('Welcome to Flashmap')
  const { nodes } = treeManager.tree

  return (
    <TreeContext.Provider value={treeManager}>
      <div className="app">
        {nodes ? (
          <div className="vertices">
            {nodes.map(node => (
              <Vertex key={node.id} vertex={node} />
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
