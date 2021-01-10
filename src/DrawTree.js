import { useState, useEffect, useRef } from 'react'
import { hierarchy, tree, select, linkHorizontal } from 'd3'

const HEIGHT = 850
const WIDTH = 1200
const NODE_H = 200
const NODE_W = 300
const TEST_DATA = {
  name: 'JavaScript',
  children: [
    {
      name: 'Functions',
      children: [],
    },
    {
      name: 'Numbers',
      children: [],
    },
    {
      name: 'Strings',
      children: [],
    },
    {
      name: 'Objects',
      children: [
        {
          name: 'Constructing them',
          children: [],
        },
      ],
    },
  ]
}

function DrawNode({ node }) {
  const d3Node = useRef(null)

  useEffect(() => {
    if (d3Node.current) {
      const g = select(d3Node.current)
        .attr("transform", `translate(${NODE_H},${HEIGHT/2})`)
    }
  }, [d3Node])

  const x = node.y - (NODE_W / 2)
  const y = node.x - (NODE_H / 2)

  return (
    <g ref={d3Node}>
      {/* x and y swapped due to horizontal growth */}
      <foreignObject height={NODE_H} width={NODE_W} x={x} y={y}>
        <div className="node-card">
          <p>{node.data.name}</p>
        </div>
      </foreignObject>
    </g>
  )
}

// Adapted from https://observablehq.com/@d3/tidy-tree
function DrawTree() {
  const d3Tree = useRef(null)
  const [nodes, setNodes] = useState([])

  const initTree = (data) => {
    const root = hierarchy(data)
    root.dx = NODE_H * 1.125
    root.dy = NODE_W * 1.5
    return tree().nodeSize([root.dx, root.dy])(root)
  }

  const drawLinks = (root, svg) => {
    const g = svg.append("g")
      .attr("transform", `translate(${NODE_H},${HEIGHT/2})`)

    g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll("path")
      .data(root.links())
      .join("path")
        .attr("d", linkHorizontal()
            .x(d => d.y)
            .y(d => d.x))
  }

  useEffect(() => {
    if (d3Tree.current) {
      const root = initTree(TEST_DATA)
      setNodes(root.descendants())
      const svg = select(d3Tree.current)

      drawLinks(root, svg)

      return () => svg.selectAll("path").remove()
    }
  }, [d3Tree])

  return (
    <div className="tree-wrapper">
      <svg
        className="d3-tree"
        ref={d3Tree}
        height={HEIGHT}
        width={WIDTH}
      >
        {nodes.map((node, i) => (
          <DrawNode
            key={`${node.data.name}_${i}`}
            node={node}
          />
        ))}
      </svg>
    </div>
  )
}

export default DrawTree
