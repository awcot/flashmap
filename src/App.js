import { createContext, useContext } from 'react'
import './App.css'

import useTree from './useTree'

export const TreeContext = createContext(null)

function App() {
  const treeManager = useTree('Welcome to Flashmap')
  const { nodes } = treeManager.tree

  return (
    <TreeContext.Provider value={treeManager}>
      <div className="app">
        {nodes.map(node => (
          <Vertex vertex={node} />
        ))}
      </div>
    </TreeContext.Provider>
  )
}

function Vertex({ vertex }) {
  const { actions } = useContext(TreeContext)

  return (
    <div className="vertex">
      <span className="vertex-text">{vertex.data.text}</span>
      <button>+</button>
    </div>
  )
}

export default App
