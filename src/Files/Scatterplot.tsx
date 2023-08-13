import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { useState } from "react";
import { InteractionData, Tooltip } from "./Tooltip";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type DataPoint = {
  x: number;
  y: number;
  size: number;
  group: string;
  subGroup: string;
};

type ScatterplotProps = {
  width: number;
  height: number;
  data: DataPoint[];
  state: object;
};

export const Scatterplot = ({ width, height, data, state }: ScatterplotProps) => {
  
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const [hovered, setHovered] = useState<InteractionData | null>(null);

  // Scales
  const yScale = d3.scaleLinear().domain([35, 85]).range([boundsHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([-3000, 50000])
    .range([0, boundsWidth]);
  const allGroups = data.map((d) => String(d.group));
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allGroups)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

    let filteredData: DataPoint[] = [];

    if (state === 'europe') {
      filteredData = data.filter(d => d.group === 'Europe');
    } else if (state === 'asia') {
      filteredData = data.filter(d => d.group === 'Asia');
    } else if (state === 'africa') {
      filteredData = data.filter(d => d.group === 'Africa');
    } else if (state === 'americas') {
      filteredData = data.filter(d => d.group === 'Americas');
    } else if (state === 'oceania') {
      filteredData = data.filter(d => d.group === 'Oceania');
    }
     else {
      filteredData = data;
    }

  const allShapes = filteredData.map((d, i) => {
    return (
      <circle
        key={i}
        r={8}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        stroke={colorScale(d.group)}
        fill={colorScale(d.group)}
        fillOpacity={0.7}
        onMouseEnter={() =>
          setHovered({
            xPos: xScale(d.x),
            yPos: yScale(d.y),
            name: d.subGroup,
          })
        }
        onMouseLeave={() => setHovered(null)}
      />
    );
  });

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >

          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>
          {allShapes}
        </g>
      </svg>

      <div
        style={{
          width: boundsWidth,
          height: boundsHeight,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          marginLeft: MARGIN.left,
          marginTop: MARGIN.top,
        }}
      >
        <Tooltip interactionData={hovered} />
      </div>
    </div>
  );
};
