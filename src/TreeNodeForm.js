import { useState } from 'react'

function TreeNodeForm({ selectedNode = {}, actions }) {
  const [form, setForm] = useState(selectedNode.data)

  const save = () => actions.saveNode(selectedNode.id, form)
  const cancel = () => actions.selectNode(null)

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
      <button onClick={save}>Save</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  )
}

export default TreeNodeForm
