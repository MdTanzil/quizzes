/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const ProgressBar = ({ value, maxValue }) => {
  return (
    <CircularProgressbar
      value={value}
      maxValue={maxValue}
      text={`${((value / maxValue) * 100).toFixed(2)}%`}
      style={buildStyles({
        textSize: "10px",
      })}
    />
  );
};

export default ProgressBar;
