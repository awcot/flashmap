import { useState, useEffect, useContext } from 'react'

import { TreeContext } from './App'
import { ROOT } from './useTree'

function TreeNode({ node }) {
  const [mode, setMode] = useState('show')
  const [form, setForm] = useState(node.data)
  const { actions } = useContext(TreeContext)

  useEffect(() => {
    if (mode === 'confirmEdit') {
      actions.editNode(node.id, form)
      setMode('show')
    }
    if (mode === 'cancel') {
      setForm(node.data)
      setMode('show')
    }
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
      {mode === 'edit' && (
        <TreeNodeForm form={form} setForm={setForm} />
      )}
      <TreeNodeControls mode={mode} setMode={setMode} />
    </div>
  )
}

function TreeNodeForm({ form, setForm }) {
  return (
    <div className="node-form">
      {Object.keys(form).map(key => (
        <label key={key}>
          {key}:
          <input
            type="text"
            value={form[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
          />
        </label>
      ))}
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
