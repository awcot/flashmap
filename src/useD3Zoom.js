import { useState, useEffect } from "react";
import { select, zoomIdentity, zoom as d3zoom } from "d3";

import { DIMS } from "./App";

export const useD3Zoom = (d3TreeRef) => {
  const [svg, setSvg] = useState(null);
  const [{ x, y, k }, setTransform] = useState({
    x: DIMS.nodeHeight,
    y: DIMS.height / 2,
    k: 1,
  });

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
    setSvg(select(d3TreeRef.current));
  }, [d3TreeRef]);

  return { x, y, k };
};

export default useD3Zoom;
