import { useState, useEffect, useRef } from 'react'
import { select } from 'd3'

function Node({ node, actions, initialMode = 'show' }) {
  const [mode, setMode] = useState(initialMode)
  const [form, setForm] = useState({})

  const edit = () => {
    setForm(node.data.text)
    setMode('edit')
  }

  const cancel = () => {
    setForm({})
    setMode('show')
  }

  const save = () => {
    actions.saveNode(node.data.id, form)
    cancel()
  }

  return (
    <div className="node-card spacer">
      {mode === 'show' && (
        <>
          <h1>{node.data.text.name || 'Click edit to enter a name'}</h1>
          <button onClick={edit}>Edit</button>
          <button onClick={() => actions.addNode(node.data.id)}>Add</button>
        </>
      )}
      {mode === 'edit' && (
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
      )}
    </div>
  )
}

function DrawNode({ node, actions, height, nodeHeight, nodeWidth }) {
  const d3NodeRef = useRef(null)
  const x = node.y - (nodeWidth / 2)
  const y = node.x - (nodeHeight / 2)

  useEffect(() => {
    if (d3NodeRef.current) {
      select(d3NodeRef.current)
        .attr("transform", `translate(${nodeHeight}, ${height/2})`)
    }
  }, [d3NodeRef])

  return (
    <g ref={d3NodeRef}>
      <foreignObject height={nodeHeight} width={nodeWidth} x={x} y={y}>
        <Node node={node} actions={actions} />
      </foreignObject>
    </g>
  )
}

export default DrawNode
