import './App.css'

// import useTree from './useTree'
// import Tree from './Tree'
// import TreeNodeForm from './TreeNodeForm'
import DrawTree from './DrawTree'

function App() {
  // const { tree, actions } = useTree()

  // const selectedNode = tree.nodes.find(n => n.id === tree.selectedId)

  return (
    <div className="app">
      <DrawTree />
      {/* {tree.nodes && ( */}
      {/*   <div className="tree-nodes"> */}
      {/*     <Tree nodes={tree.nodes} actions={actions} /> */}
      {/*   </div> */}
      {/* )} */}
      {/* {selectedNode && ( */}
      {/*   <TreeNodeForm selectedNode={selectedNode} actions={actions} /> */}
      {/* )} */}
    </div>
  )
}

export default App
