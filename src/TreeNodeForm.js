import { useState, useEffect, useContext } from 'react'

import { TreeContext } from './App'

function TreeNodeForm() {
  const treeManager = useContext(TreeContext)
  const { nodes, selectedId } = treeManager.tree
  const [selectedNode, setSelectedNode] = useState({})

  useEffect(() => {
    if (selectedId !== null) {
      setSelectedNode(nodes.find(n => n.id === selectedId))
    }
  }, [selectedId, nodes])

  const [form, setForm] = useState(selectedNode.data)

  const save = () => treeManager.actions.editNode(selectedNode.id, form)

  if (!form) return null

  return (
    <div className="node-form">
      {selectedNode.parentId === null && (
        <div className="node-form-message">
          What is the map's name?
        </div>
      )}
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
      <button onClick={save}>Save</button>
      <button onClick={() => {}}>Cancel</button>
    </div>
  )
}

export default TreeNodeForm
