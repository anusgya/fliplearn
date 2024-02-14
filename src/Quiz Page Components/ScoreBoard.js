import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import "../Styles-QuizPageComponents/ScoreBoard.css";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function ScoreBoard({
  correctCount,
  totalCount,
  incorrectAnswers,
  cards,
}) {
  return (
    <div className="scoreboard-container">
      <div
        className="scoreboard"
        style={{
          fontSize: "1.2rem",
          fontWeight: "400",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap:"15px"
        }}
      >
        <CircularProgressbar
          value={(correctCount / totalCount) * 100}
          text={`${correctCount}/${totalCount}`}
          styles={{
            root: { height: "70px", width: "70px" },
            path: {
              stroke: "#00509A",
              // transition: "stroke-dashoffset 0.5s ease 0s",
            },
            text: { fill: "#00509A" },
          }}
        />
        <div>
          You scored{" "}
          <span style={{ fontSize: "1.5rem", fontWeight: "500" }}>
            {correctCount}
          </span>{" "}
          out of{" "}
          <span style={{ fontSize: "1.5rem", fontWeight: "500" }}>
            {totalCount}
          </span>
        </div>
      </div>
      {incorrectAnswers.length !== 0 && (
        <div style={{ color: "white", margin: "3rem 0 0.5rem 0" }}>
          Must Review
        </div>
      )}

      <div className="i-qns-ans-container">
        {incorrectAnswers.map((index) => (
          <div key={index} className="qns-ans-group">
            <div className="i-qns">{cards[index].question}</div>
            <div className="i-ans">
              <span style={{ color: "#1A6400" }}>Ans: </span>
              {cards[index].answer}
            </div>
            {/* <CircularProgress value={80} /> */}
            {/* <CircularProgress isIndeterminate color='green.300' /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
