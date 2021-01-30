import React, { useState } from "react";

function Node({ node, dispatch, initialMode = "show" }) {
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
    dispatch({ type: "update-node", id: node.data.id, data: form });
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
          <button
            onClick={() =>
              dispatch({ type: "add-node", parentId: node.data.id })
            }
            data-testid={`add-btn-${node.data.id}`}
          >
            Add
          </button>
          {node.data.id > 0 && (
            <button
              onClick={() =>
                dispatch({ type: "delete-node", id: node.data.id })
              }
              data-testid={`delete-btn-${node.data.id}`}
            >
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

function DrawNode({ node, data, dispatch, nodeHeight, nodeWidth }) {
  const x = node.y - nodeWidth / 2;
  const y = node.x - nodeHeight / 2;

  return (
    <g>
      <foreignObject height={nodeHeight} width={nodeWidth} x={x} y={y}>
        <Node node={node} data={data} dispatch={dispatch} />
      </foreignObject>
    </g>
  );
}

export default React.memo(DrawNode);
