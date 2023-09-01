import {select, line, curveCardinal} from "d3";
import { useEffect, useRef, useState } from "react";

export default function Scatterplot(){
  const [data, setData] = useState([25, 30, 45, 60, 20,80, 88, 72])
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const myWay = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveCardinal)

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myWay(value))
      .attr("fill", "none")
      .attr("stroke", "blue")
      
    /*svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cy", value => value * 3)
      .attr("cx", value => value * 3)
      .attr("fill", value => `#3FEAF5${value}`)*/
  }, [data])

  const handleClick = () =>{
    setData(old => old.map(value => value * 1.1))
  }

  return(
    <main>
        <svg ref={svgRef} width={500} height={500}></svg>
        <button onClick={handleClick}>Flow</button>
    </main>
  );
}