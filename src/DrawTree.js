import { useEffect, useRef } from 'react'
import { hierarchy, tree, select, linkHorizontal } from 'd3'

const TEST_DATA = {
  name: 'JavaScript',
  children: [
    {
      name: 'Functions',
      // children: [],
    },
    {
      name: 'Objects',
      // children: [],
    },
  ]
}

function DrawTree() {
  const d3tree = useRef(null)

  const width = 954

  const initTree = (data) => {
    const root = hierarchy(data)
    root.dx = 275
    root.dy = width / (root.height + 1)
    return tree().nodeSize([root.dx, root.dy])(root)
  }

  useEffect(() => {
    if (d3tree.current) {
      const svg = select(d3tree.current)

      const root = initTree(TEST_DATA)

      let x0 = Infinity
      let x1 = -x0
      root.each(d => {
        if (d.x > x1) x1 = d.x
        if (d.x < x0) x0 = d.x
      })

      const g = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`)

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

      const node = g.append("g")
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants())
        .join("g")
          .attr("transform", d => `translate(${d.y},${d.x})`)

      node.append("circle")
          .attr("fill", d => d.children ? "#555" : "#999")
          .attr("r", 2.5)

      node.append("text")
          .attr("dy", "0.31em")
          .attr("x", d => d.children ? -6 : 6)
          .attr("text-anchor", d => d.children ? "end" : "start")
          .text(d => d.data.name)
        .clone(true).lower()
          .attr("stroke", "white")
    }
  }, [d3tree])

  return (
    <svg
      className="d3-tree"
      ref={d3tree}
      height={850}
      width={1200}
    />
  )
}

export default DrawTree
