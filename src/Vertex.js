import { useContext } from 'react'

import { TreeContext } from './App'

function Vertex({ vertex }) {
  const { actions } = useContext(TreeContext)

  return (
    <div className="vertex">
      <span className="vertex-text">{vertex.data.text}</span>
      <button>Add</button>
      <button>Edit</button>
    </div>
  )
}

export default Vertex
