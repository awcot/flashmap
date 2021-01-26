import { useState, useEffect, useRef } from "react";
import { hierarchy, tree, select, zoomIdentity, zoom as d3zoom } from "d3";

import useTree from "./useTree";
import DrawLink from "./DrawLink";
import DrawNode from "./DrawNode";

const DIMS = {
  height: 850,
  width: 1200,
  nodeHeight: 200,
  nodeWidth: 300,
};

// Adapted from https://observablehq.com/@d3/tidy-tree
function DrawTree() {
  const d3TreeRef = useRef(null);
  const treeWrapperRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [svg, setSvg] = useState(null);
  const [{ x, y, k }, setTransform] = useState({
    x: DIMS.nodeHeight,
    y: DIMS.height / 2,
    k: 1,
  });
  const { state, dispatch } = useTree();

  const initTree = (data) => {
    const root = hierarchy(data);
    root.dx = DIMS.nodeHeight * 1.125;
    root.dy = DIMS.nodeWidth * 1.5;
    return tree().nodeSize([root.dx, root.dy])(root);
  };

  useEffect(() => {
    setSvg(select(d3TreeRef.current));
  }, []);

  useEffect(() => {
    if (svg) {
      svg.call(
        d3zoom().transform,
        zoomIdentity.translate(DIMS.nodeHeight, DIMS.height / 2).scale(1)
      );
      const zoom = d3zoom().on("zoom", (event) => {
        setTransform(event.transform);
      });
      svg.call(zoom).on("dblclick.zoom", null);
      return () => {
        svg.on("zoom", null);
      };
    }
  }, [svg]);

  useEffect(() => {
    const root = initTree(state.tree);
    setNodes(root.descendants());
    setLinks(root.links());
  }, [state.tree]);

  return (
    <div className="tree-wrapper" ref={treeWrapperRef}>
      <svg
        className="d3-tree"
        ref={d3TreeRef}
        height={DIMS.height}
        width={DIMS.width}
      >
        <g transform={`translate(${x}, ${y}) scale(${k})`}>
          {links.map((link) => (
            <DrawLink
              key={`${link.source.data.id}->${link.target.data.id}`}
              link={link}
              nodeWidth={DIMS.nodeWidth}
            />
          ))}
          {nodes.map((node) => (
            <DrawNode
              key={node.data.id}
              node={node}
              dispatch={dispatch}
              nodeWidth={DIMS.nodeWidth}
              nodeHeight={DIMS.nodeHeight}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default DrawTree;
