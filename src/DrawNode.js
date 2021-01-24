import { useState } from "react";

function Node({ node, actions, initialMode = "show" }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({});

  const edit = () => {
    setForm(node.data.text);
    setMode("edit");
  };

  const cancel = () => {
    setForm({});
    setMode("show");
  };

  const save = () => {
    actions.updateNode(node.data.id, form);
    cancel();
  };

  return (
    <div className="node-card">
      {mode === "show" && (
        <>
          <h1>{node.data.text.name || "Click edit to enter a name"}</h1>
          {node.data.text.question && <div>{node.data.text.question}</div>}
          {node.data.text.answer && <div>{node.data.text.answer}</div>}
          <button onClick={edit}>Edit</button>
          <button onClick={() => actions.addNode(node.data.id)}>Add</button>
          {node.data.id > 0 && (
            <button onClick={() => actions.deleteNode(node.data.id)}>
              Delete
            </button>
          )}
        </>
      )}
      {mode === "edit" && (
        <div className="node-form">
          {Object.keys(form).map((key) => (
            <label key={key}>
              {key}:
              <input
                type="text"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </label>
          ))}
          <button onClick={save}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

function DrawNode({ node, data, actions, nodeHeight, nodeWidth }) {
  const x = node.y - nodeWidth / 2;
  const y = node.x - nodeHeight / 2;

  return (
    <g>
      <foreignObject height={nodeHeight} width={nodeWidth} x={x} y={y}>
        <Node node={node} data={data} actions={actions} />
      </foreignObject>
    </g>
  );
}

export default DrawNode;
