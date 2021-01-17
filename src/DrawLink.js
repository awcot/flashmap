import { linkHorizontal } from 'd3'

function DrawLink({ link, nodeWidth }) {
  const { source, target } = link
  const d = linkHorizontal()({
    source: [source.y, source.x],
    target: [target.y - (nodeWidth / 2), target.x],
  })

  return (
    <path
      className="node-link"
      d={d}
    />
  )
}

export default DrawLink
