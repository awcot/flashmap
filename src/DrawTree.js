import { useState, useEffect, useRef } from 'react'
import { hierarchy, tree, select, zoom as d3zoom } from 'd3'

import useTree from './useTree'
import DrawLink from './DrawLink'
import DrawNode from './DrawNode'

const DIMS = {
  height: 850,
  width: 1200,
  nodeHeight: 200,
  nodeWidth: 300
}

// Adapted from https://observablehq.com/@d3/tidy-tree
function DrawTree() {
  const d3TreeRef = useRef(null)
  const treeWrapperRef = useRef(null)
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const [svg, setSvg] = useState(null)
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 })

  const { tree: treeData, actions } = useTree()

  const initTree = (data) => {
    const root = hierarchy(data)
    root.dx = DIMS.nodeHeight * 1.125
    root.dy = DIMS.nodeWidth * 1.5
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
      const root = initTree(treeData.nodes[0])
      initZoom(svg)
      setNodes(root.descendants())
      setLinks(root.links())
      return () => {
        svg.on("zoom", null)
      }
    }
  }, [svg, treeData.nodes])

  return (
    <div className="tree-wrapper" ref={treeWrapperRef}>
      <svg
        className="d3-tree"
        ref={d3TreeRef}
        height={DIMS.height}
        width={DIMS.width}
      >
        <g transform={`translate(${x}, ${y}) scale(${k})`}>
          {links.map((link, i) => (
            <DrawLink
              key={`link_${i}`}
              link={link}
              {...DIMS}
            />
          ))}
          {nodes.map((node, i) => (
            <DrawNode
              key={`node_${i}`}
              node={node}
              actions={actions}
              {...DIMS}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default DrawTree
