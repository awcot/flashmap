import { useState, useEffect, useContext } from 'react'

import { TreeContext } from './App'

function TreeNode({ node }) {
  const [mode, setMode] = useState('show')
  const { actions } = useContext(TreeContext)

  useEffect(() => {
    if (mode === 'add') {
      actions.addNode(node.id, {})
      setMode('show')
    }
  }, [mode])

  return (
    <div className="node">
      {mode === 'show' && (
        <span className="node-text">{node.data.text}</span>
      )}
      <TreeNodeControls mode={mode} setMode={setMode} />
    </div>
  )
}


function TreeNodeControls({ mode, setMode }) {
  return (
    <div className="node-controls">
      {mode === 'show' && (
        <>
          <button onClick={() => setMode('add')}>Add</button>
          <button onClick={() => setMode('edit')}>Edit</button>
        </>
      )}
      {mode === 'edit' && (
        <>
          <button onClick={() => setMode('confirmEdit')}>Save</button>
          <button onClick={() => setMode('cancel')}>Cancel</button>
        </>
      )}
    </div>
  )
}

export default TreeNode
