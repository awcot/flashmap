function Tree({ nodes, actions, nodeId = 0 }) {
  const node = nodes.find(n => n.id === nodeId)

  const add = () => actions.addNode(node.id)
  const edit = () => actions.selectNode(node.id)

  return (
    <div className={`node ${false ? 'node--selected' : ''}`}>
      <span className="node-text">{node.data?.text}</span>
      <div className="node-controls">
        <button onClick={add}>Add</button>
        <button onClick={edit}>Edit</button>
      </div>
      <div className="tree-children">
        {node.children.map((id) => (
          <Tree
            key={id}
            nodes={nodes}
            actions={actions}
            nodeId={id}
          />
        ))}
      </div>
    </div>
  )
}

export default Tree
