import { useState, useEffect, useRef } from "react";
import { hierarchy, tree } from "d3";

import useTree from "./useTree";
import useD3Zoom from "./useD3Zoom";
import DrawLink from "./DrawLink";
import DrawNode from "./DrawNode";

import { DIMS } from "./App";

// Adapted from https://observablehq.com/@d3/tidy-tree
function DrawTree() {
  const d3TreeRef = useRef(null);
  const treeWrapperRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const { x, y, k } = useD3Zoom(d3TreeRef);
  const { state, dispatch } = useTree();

  const initTree = (data) => {
    const root = hierarchy(data);
    root.dx = DIMS.nodeHeight * 1.125;
    root.dy = DIMS.nodeWidth * 1.5;
    return tree().nodeSize([root.dx, root.dy])(root);
  };

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
        data-testid="d3-tree-svg"
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
