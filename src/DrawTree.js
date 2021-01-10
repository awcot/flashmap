import { useState, useEffect, useRef } from 'react'
import { hierarchy, tree, select, linkHorizontal, zoomIdentity, zoom as d3zoom } from 'd3'

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
      children: [
        {
          name: 'The toString() function'
        }
      ],
    },
    {
      name: 'Objects',
      children: [
        {
          name: 'Constructing them',
          children: [],
        },
        {
          name: 'Protoypal inheritance',
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
      select(d3Node.current)
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
          <div>{node.data.name}</div>
        </div>
      </foreignObject>
    </g>
  )
}

// Adapted from https://observablehq.com/@d3/tidy-tree
function DrawTree() {
  const d3TreeRef = useRef(null)
  const treeWrapperRef = useRef(null)
  const [nodes, setNodes] = useState([])
  const [svg, setSvg] = useState(null)
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 })

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

  const initZoom = (svg) => {
    const zoom = d3zoom().on("zoom", (event) => {
      setTransform(event.transform)
    })
    svg.call(zoom)
  }

  useEffect(() => {
    setSvg(select(d3TreeRef.current))
  }, [])

  useEffect(() => {
    if (svg) {
      const root = initTree(TEST_DATA)
      initZoom(svg)
      setNodes(root.descendants())
      drawLinks(root, svg)
      return () => {
        svg.on("zoom", null)
        svg.selectAll("path").remove()
      }
    }
  }, [svg])

  // useEffect(() => {
  //   const dims = treeWrapperRef.current.getBoundingClientRect()
  //   setTranslateBy([dims.width / 2.5, dims.height / 2])
  // }, [])

  return (
    <div className="tree-wrapper" ref={treeWrapperRef}>
      <svg
        className="d3-tree"
        ref={d3TreeRef}
        height={HEIGHT}
        width={WIDTH}
      >
        <g transform={`translate(${x}, ${y}) scale(${k})`}>
          {nodes.map((node, i) => (
            <DrawNode
              key={`${node.data.name}_${i}`}
              node={node}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default DrawTree
