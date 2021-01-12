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
          name: 'Prototypical inheritance',
          children: [],
        },
      ],
    },
  ]
}

function DrawLink({ link }) {
  const d3LinkRef = useRef(null)
  const { source, target } = link
  const d = linkHorizontal()({
    source: [source.y, source.x],
    target: [target.y - (NODE_W / 2), target.x],
  })

  useEffect(() => {
    if (d3LinkRef.current) {
      select(d3LinkRef.current)
        .attr("transform", `translate(${NODE_H}, ${HEIGHT/2})`)
    }
  }, [d3LinkRef])

  return (
    <path
      ref={d3LinkRef}
      className="node-link"
      d={d}
    />
  )
}

function DrawNode({ node }) {
  const d3NodeRef = useRef(null)
  const x = node.y - (NODE_W / 2)
  const y = node.x - (NODE_H / 2)

  useEffect(() => {
    if (d3NodeRef.current) {
      select(d3NodeRef.current)
        .attr("transform", `translate(${NODE_H}, ${HEIGHT/2})`)
    }
  }, [d3NodeRef])

  return (
    <g ref={d3NodeRef}>
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
  const [links, setLinks] = useState([])
  const [svg, setSvg] = useState(null)
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 })

  const initTree = (data) => {
    const root = hierarchy(data)
    root.dx = NODE_H * 1.125
    root.dy = NODE_W * 1.5
    return tree().nodeSize([root.dx, root.dy])(root)
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
      setLinks(root.links())
      return () => {
        svg.on("zoom", null)
      }
    }
  }, [svg])

  return (
    <div className="tree-wrapper" ref={treeWrapperRef}>
      <svg
        className="d3-tree"
        ref={d3TreeRef}
        height={HEIGHT}
        width={WIDTH}
      >
        <g transform={`translate(${x}, ${y}) scale(${k})`}>
          {links.map((link, i) => (
            <DrawLink
              key={`link_${i}`}
              link={link}
            />
          ))}
          {nodes.map((node, i) => (
            <DrawNode
              key={`node_${i}`}
              node={node}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default DrawTree
