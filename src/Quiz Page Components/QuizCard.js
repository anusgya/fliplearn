import React, { useState, useEffect } from "react";
import Button from "../Home Page Components/Button";
import "../Styles-QuizPageComponents/QuizCard.css";
import {ReactComponent as CorrectIcon} from '../assets/check.svg'
import {ReactComponent as IncorrectIcon} from '../assets/x.svg'

export default function QuizCard({
  card,
  handleIncorrectAnswers,
  handleCorrectAnswers,
  flip,
  setFlip,
}) {
  // const [flip, setFlip] = useState(false);

  const [showButtons, setShowButtons] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
    setShowButtons(!showButtons);
  };

  useEffect(() => {
    setShowButtons(false);
  }, [card]);

  return (
    <>
      <div className="flashcard-container">
        <div className="bgcard-1"></div>
        <div className="bgcard-2"></div>
        <div className={`quiz-card ${flip ? "flip" : ""}`} onClick={handleFlip}>
          <div className="quiz-card front">{card.question}</div>
          <div className="quiz-card back">{card.answer}</div>
        </div>
      </div>
      {showButtons && (
        <div className="correct-incorrect-btns-container">
          <Button
            className={"incorrect-ans-btn"}
            value={<IncorrectIcon/>}
            handleClick={handleIncorrectAnswers}
          />
          <Button
            className={"correct-ans-btn"}
            value={<CorrectIcon/>}
            handleClick={handleCorrectAnswers}
          />
        </div>
      )}
    </>
  );
}
