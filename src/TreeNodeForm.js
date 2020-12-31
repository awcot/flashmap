import { useState, useEffect, useContext } from 'react'

function TreeNodeForm({ selectedNode = {}, actions }) {
  const [form, setForm] = useState(selectedNode.data)

  const save = () => actions.editNode(selectedNode.id, form)

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
    </div>
  )
}

export default TreeNodeForm
