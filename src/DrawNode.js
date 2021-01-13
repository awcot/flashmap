import { useEffect, useRef } from 'react'
import { select } from 'd3'

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
        <div className="node-card">
          <div>{node.data.name}</div>
        </div>
      </foreignObject>
    </g>
  )
}

export default DrawNode
