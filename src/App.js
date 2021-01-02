import './App.css'

import useTree from './useTree'
import TreeNode from './TreeNode'
import TreeNodeForm from './TreeNodeForm'

function App() {
  const { tree, actions } = useTree()

  const selectedNode = tree.nodes.find(n => n.id === tree.selectedId)

  return (
    <div className="app">
      {tree.nodes && (
        <div className="tree-nodes">
          {tree.nodes.map(node => (
            <TreeNode
              key={node.id}
              node={node}
              actions={actions}
              selected={selectedNode === node}
            />
          ))}
        </div>
      )}
      {selectedNode && (
        <TreeNodeForm selectedNode={selectedNode} actions={actions} />
      )}
    </div>
  )
}

export default App
