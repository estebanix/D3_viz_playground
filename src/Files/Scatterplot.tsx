import {select} from "d3";
import { useEffect, useRef, useState } from "react";

export default function Scatterplot(){
  const [data, setData] = useState([40, 22, 52, 98, 67])
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cy", value => value * 3)
      .attr("cx", value => value * 3)
      .attr("fill", value => `#3FEAF5${value}`)
  }, [data])

  return(
    <main>
        <svg ref={svgRef} width={500} height={500}></svg>
    </main>
  );
}