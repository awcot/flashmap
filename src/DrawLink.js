import { useEffect, useRef } from 'react'
import { select, linkHorizontal } from 'd3'

function DrawLink({ link, height, nodeHeight, nodeWidth }) {
  const d3LinkRef = useRef(null)
  const { source, target } = link
  const d = linkHorizontal()({
    source: [source.y, source.x],
    target: [target.y - (nodeWidth / 2), target.x],
  })

  useEffect(() => {
    if (d3LinkRef.current) {
      select(d3LinkRef.current)
        .attr("transform", `translate(${nodeHeight}, ${height/2})`)
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

export default DrawLink
