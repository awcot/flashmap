function TreeNode({ node, actions, selected }) {
  const add = () => actions.addNode(node.id)
  const edit = () => actions.selectNode(node.id)

  return (
    <div className={`node ${selected ? 'node--selected' : ''}`}>
      <span className="node-text">{node.data?.text}</span>
      <div className="node-controls">
        <button onClick={add}>Add</button>
        <button onClick={edit}>Edit</button>
      </div>
    </div>
  )
}

export default TreeNode
