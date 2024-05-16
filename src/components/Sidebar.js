import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";
import { Slider } from "@mui/material";

function Sidebar() {
  const myState = useSelector((state) => state.updateProps);
  const dispatch = useDispatch();
  const [max, setMax] = useState(30);
  const [workingPrinciple, setWorkingPrinciple] = useState("");

  const handleAlgo = (algo) => {
    dispatch({
      type: "UPDATE_ALGORITHM",
      algorithm: algo,
    });
    setWorkingPrinciple(algoWorkingPrinciples[algo]);
  };

  const resetColor = () => {
    dispatch({
      type: "UPDATE_COLOR",
      color: document.getElementById("color").value,
    });
  };

  const handleRange = (_range) => {
    let new_arr = [...myState.values];
    for (let i = 0; i < new_arr.length; i++)
      document.getElementById(i).style.transform = `translateX(${i * 11}px)`;

    resetColor();

    dispatch({
      type: "UPDATE_RANGE",
      range: _range,
    });
    dispatch({
      type: "CHANGE_VALUES",
    });
  };

  const handleColor = (_color) => {
    dispatch({
      type: "UPDATE_COLOR",
      color: _color,
    });
  };

  const handleSpeed = (_speed) => {
    dispatch({
      type: "UPDATE_SPEED",
      speed: _speed,
    });
  };

  useEffect(() => {
    handleRange(30);
  }, []);

  useEffect(() => {
    dispatch({
      type: "UPDATE_COLOR",
      color: document.getElementById("color").value,
    });
  }, [myState.values]);

  const handleWidth = () => {
    if (window.innerWidth > 1300) setMax(70);
    else if (window.innerWidth > 1200) setMax(60);
    else if (window.innerWidth > 1100) setMax(50);
    else if (window.innerWidth > 900) setMax(45);
    else if (window.innerWidth > 800) setMax(40);
    else if (window.innerWidth > 500) setMax(30);
    else setMax(20);
  };

  useEffect(() => {
    handleWidth();
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, []);

  const algoWorkingPrinciples = {
    bubble:
      "Bubble sort works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order that is if the current element is of greater value as compared to its next.",
    merge:
      "Merge sort works by dividing the array into two halves, recursively sorting each half, and then merging them back together in sorted order.",
    insertion:
      "Insertion sort works by building the final sorted array one element at a time by repeatedly taking the next element and inserting it into the proper position among the already sorted elements.",
    selection:
      "Selection sort works by dividing the input array into a sorted and an unsorted region, repeatedly selecting the smallest (or largest) element from the unsorted region and swapping it with the first element of the unsorted region.",
    quick:
      "Quick sort works by choosing a 'pivot' element from the array, partitioning the array so that all elements smaller than the pivot are on its left, and all elements greater are on its right, then recursively applying the same process to the subarrays.",
  };

  return (
    <div className="sidebar">
      <div className="sidebar__option">
        <label htmlFor="algo">Algorithm: </label>
        <select
          name="algo"
          id="algo"
          onChange={(e) => handleAlgo(e.target.value)}
          disabled={myState.play ? true : false}
        >
          <option value="">Choose an algorithm</option>
          <option value="bubble">Bubble Sort </option>
          <option value="merge">Merge Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
      </div>

      <div className="sidebar__option">
        <label htmlFor="range">Range: </label>
        <Slider
          style={{ width: "180px" }}
          size="small"
          defaultValue={30}
          id="slider"
          min={1}
          className="slider"
          disabled={myState.play ? true : false}
          max={max}
          onChange={(e) => handleRange(e.target.value)}
          valueLabelDisplay="auto"
        />
      </div>

      <div className="sidebar__option">
        <label htmlFor="color">Color: </label>
        <select
          name="color"
          id="color"
          onChange={(e) => handleColor(e.target.value)}
          disabled={myState.play ? true : false}
        >
          <option
            value="rgb(0, 149, 199)"
            style={{ color: "rgb(0, 149, 199)" }}
          >
            Blue
          </option>
          <option
            value="rgb(110,160,110)"
            style={{ color: "rgb(110,160,110)" }}
          >
            Green
          </option>
          <option value="rgb(255, 112, 112)" style={{ color: "red" }}>
            Red
          </option>
          <option value="grey" style={{ color: "grey" }}>
            Grey
          </option>
          <option
            value="rgb(202, 198, 61)"
            style={{ color: "rgb(202, 198, 61)" }}
          >
            Yellow
          </option>
        </select>
      </div>

      <div className="sidebar__option">
        <label htmlFor="speed">Speed: </label>
        <select
          name="speed"
          defaultValue={100}
          id="speed"
          onChange={(e) => handleSpeed(e.target.value)}
          disabled={myState.play ? true : false}
        >
          <option value={500}>Slow</option>
          <option value={200}>Medium</option>
          <option value={100}>Fast</option>
          <option value={20}>Super Fast</option>
          {/* <option value={5}>Ultra Fast</option> */}
        </select>
      </div>

      {workingPrinciple && (
        <div className="sidebar__working-principle">
          <label htmlFor="working-principle">Working Principle:</label>
          <p>{workingPrinciple}</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
