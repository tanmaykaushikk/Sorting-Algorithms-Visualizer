import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import QuickSort from "./QuickSort";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";
import "./Visuals.css";

function Visuals() {
  const myState = useSelector((state) => state.updateProps);
  const dispatch = useDispatch();
  const color = myState.color;
  const range = myState.range;

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

  const readOutLoud = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const changeValues = () => {
    let new_arr = [...myState.values];
    for (let i = 0; i < new_arr.length; i++)
      document.getElementById(i).style.transform = `translateX(${i * 11}px)`;

    dispatch({
      type: "CHANGE_VALUES",
    });
  };

  const handlePlayPause = (play) => {
    if (!myState.play) {
      document.getElementById("change-btn").disabled = true;
      document.getElementById("change-btn").style.backgroundColor = "grey";
      document.getElementById("play-btn").disabled = true;
      document.getElementById("play-btn").style.backgroundColor = "grey";
      if (play) {
        const algo = myState.algorithm;
        const workingPrinciple = algoWorkingPrinciples[algo];
        readOutLoud(workingPrinciple);
      }
    } else {
      return;
    }
    dispatch({
      type: "PLAY_PAUSE",
      _play: play,
    });
  };

  useEffect(() => {
    if (!myState.play) {
      document.getElementById("play-btn").disabled = false;
      document.getElementById("play-btn").style.backgroundColor =
        "rgb(0, 149, 199)";
      document.getElementById("change-btn").disabled = false;
      document.getElementById("change-btn").style.backgroundColor =
        "rgb(0, 149, 199)";
    }
  }, [myState.play]);

  let speed = myState.speed;
  if (myState.algorithm === "selection") speed *= 3;
  else if (myState.algorithm === "merge") speed *= 5;
  else if (myState.algorithm === "quick") speed *= 6;
  return (
    <div className="visuals">
      <div className="visualizer">
        {myState.algorithm === "quick" && (
          <div className="legend">
            <div className="legend__lable"></div> Pivot elements
          </div>
        )}
        {
          <div
            className="visual__items"
            style={{ width: `${myState.values.length * 11}px` }}
          >
            {myState.values.map((item) => {
              return (
                <div
                  className="visual__item"
                  key={item[1]}
                  id={item[1]}
                  style={{
                    transition: `${speed / 1000}s linear all`,
                    transform: `translateX(${item[1] * 11}px)`,
                  }}
                >
                  <h4>{item[0]}</h4>
                  <div
                    className="visual"
                    style={{
                      height: `${item[0] * 3}px`,
                      backgroundColor: color,
                      width: range < 35 ? "8px" : "6px",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        }
      </div>
      <div className="visual__btns">
        <button id="change-btn" onClick={changeValues}>
          change values
        </button>
        <button id="play-btn" onClick={() => handlePlayPause(true)}>
          play
        </button>
        <button style={{ display: "none" }}>Hidden Play Button</button>
      </div>

      <BubbleSort />
      <InsertionSort />
      <MergeSort />
      <QuickSort />
      <SelectionSort />
    </div>
  );
}

export default Visuals;
