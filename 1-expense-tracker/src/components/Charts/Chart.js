import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = (props) => {
  // calculating max value from incoming values
  const dataPointsValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const maxVal = Math.max(...dataPointsValues);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          label={dataPoint.label}
          value={dataPoint.value}
          maxValue={maxVal}
        />
      ))}
    </div>
  );
};

export default Chart;
