import { useState, useEffect, useRef } from 'react'
import { hierarchy, tree, select, linkHorizontal } from 'd3'

const HEIGHT = 850
const WIDTH = 1200
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

  return (
    <g ref={d3Node}>
      <div>NODE</div>
    </g>
  )
}

// Adapted from https://observablehq.com/@d3/tidy-tree
function DrawTree() {
  const d3Tree = useRef(null)
  const [nodes, setNodes] = useState([])

  const initTree = (data) => {
    const root = hierarchy(data)
    // TODO: I believe dx and dy should be the height and width of the component I end up rendering there
    root.dx = 200 // dx and dy are used to set the nodeSize below, as well as the position of the root
    root.dy = 600 / (root.height + 1) // root.height is the greatest distance from any descendant leaf
    return tree().nodeSize([root.dx, root.dy])(root) // curried call with root to tree lays out the hierarchy, setting the x and y coords of root and its descendants
  }

  const drawLinks = (root, svg) => {
    let x0 = Infinity
    let x1 = -x0
    root.each(d => {         // Invoke a function for the root and each of its descendants, BFS
      if (d.x > x1) x1 = d.x // Find the largest x coord
      if (d.x < x0) x0 = d.x // Find the smallest x coord
    })

    const g = svg.append("g") // Add and move the root node into position
      // .attr("font-family", "sans-serif")
      // .attr("font-size", 10)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`)

    g.append("g") // draws links for all links from the root to its descendants
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll("path")
      .data(root.links()) // set data to an array of links for the root node
      .join("path")
        .attr("d", linkHorizontal() // Create new default link generator for horizontal tangents
            .x(d => d.y) // set the x-accessor to a fn that returns the y value of the node
            .y(d => d.x))
  }

  const drawSampleNodes = (root, g) => {
    const node = g.append("g") // draw all root descendants
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`) // then move them into their x and y positions

    node.append("circle") // create filled circles
      .attr("fill", d => d.children ? "#555" : "#999") // differently depending on if it's a leaf node or not
      .attr("r", 2.5) // circle radius

    node.append("text") // put the name of each node
      .attr("dy", "0.31em") // vertical offset of the text
      .attr("x", d => d.children ? -6 : 6) // horizontal offset depending on leaf node or no
      .attr("text-anchor", d => d.children ? "end" : "start") // anchor text depending on leaf node
      .text(d => d.data.name)
      .clone(true).lower() // add a whitened clone so the text can be seen
      .attr("stroke", "white")
  }

  useEffect(() => {
    if (d3Tree.current) {
      const root = initTree(TEST_DATA)
      setNodes(root.descendants())
      const svg = select(d3Tree.current)

      drawLinks(root, svg)

      return () => svg.selectAll("*").remove()
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
          <DrawNode key={`${node.data.name}_${i}`} node={node} />
        ))}
      </svg>
    </div>
  )
}

export default DrawTree
