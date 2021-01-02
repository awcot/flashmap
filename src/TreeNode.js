import { useEffect } from 'react'

function TreeNode({ node, actions, selected }) {
  return (
    <div className={`node ${selected ? 'node--selected' : ''}`}>
      <span className="node-text">{node.data?.text}</span>
      <div className="node-controls">
        <button onClick={() => actions.addNode(node.id)}>Add</button>
        <button onClick={() => {}}>Edit</button>
      </div>
    </div>
  )
}


function TreeNodeControls({ mode, setMode, actions }) {
  const add =  actions.addNode

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
