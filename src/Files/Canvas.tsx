import ScatterPlot from "./ScatterPlot";

const Canvas = () => {
  const data = [
    { x: 10, y: 20 },
    { x: 20, y: 30 },
    { x: 30, y: 10 },
    // Add more data points
  ];

  return (
    <div className="App">
      <h1>Scatter Plot Example</h1>
      <ScatterPlot data={data} width={500} height={300} />
    </div>
  );
};

export default Canvas;
