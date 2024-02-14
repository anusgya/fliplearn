import React, { useContext, useState, useEffect } from "react";
import { CardContext, DeckContext } from "../MainApp";
import { Link } from "react-router-dom";
import Button from "../Home Page Components/Button";
import QuizDecksList from "./QuizDecksList";
import QuizCard from "./QuizCard";
import "../Styles-QuizPageComponents/QuizPage.css";
import ScoreTracker from "./ScoreTracker";
import { ChakraProvider } from "@chakra-ui/react";
import CountTracker from "./CountTracker";
import ScoreBoard from "./ScoreBoard";

export default function QuizPage() {
  const { cards } = useContext(CardContext);
  const {decks} = useContext(DeckContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noCards, setNoCards] = useState(false);
  const [flip, setFlip] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedDeck, setSelectedDeck] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    const filterCards = () => {
      // const selectedDeckID = 
      return cards.filter((card) => selectedDeck?.id === card?.deckID);
    };

    const filteredCards = filterCards();
    setSelectedCards(filteredCards);

  }, [selectedDeck, cards]);

  // if (!cards) {
  //   return <div style={{position:'fixed', justifyContent:'center', alignItems:'center'}}>No Cards To Play</div>;
  // }

  const handleIndex = () => {
    if (currentIndex === selectedCards?.length - 1) {
      setNoCards(true);
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }
  };

  const handleNewDeckSelect = (e) => {
    const deckName = e.target.getAttribute("value");
    const selectedDeckObject = decks?.find((deck)=>deck.deck===deckName);
    setSelectedDeck(prevDeck=>(selectedDeckObject));
    setStartQuiz(prevState=>(true));
    // console.log(selectedDeckObject.id);
  };

  const handleIncorrectAnswers = () => {
    setIncorrectAnswers((prevAnswers) => [...prevAnswers, currentIndex]);
    handleIndex();
    setFlip(false);
  };

  const handleCorrectAnswers = () => {
    const updatedCorrectCount = correctCount + 1;
    setCorrectCount(updatedCorrectCount);
    handleIndex();
    setFlip(false);
  };

  return (
    // <ChakraProvider>
    <div className="quiz-body-container">
      {!startQuiz && !noCards && (
        <>
          <QuizDecksList handleClick={handleNewDeckSelect} />
        </>
      )}

      {startQuiz && selectedCards[currentIndex] && !noCards ? (
        <>
          <div
            style={{ display:'flex',gap:'0.5rem',alignItems:'baseline',position: "absolute", top: "1.20rem", left: "1.5rem" }}
          >
            <div style={{color:'#C9DBEC', fontSize:'1.2rem'}}>{selectedDeck.deck}</div>
            <CountTracker
              currentCount={currentIndex + 1}
              totalCount={selectedCards?.length}
            />
          </div>
          <ScoreTracker count={correctCount} />
          {selectedCards.length!==0 && <QuizCard
            card={selectedCards[currentIndex]}
            handleCorrectAnswers={handleCorrectAnswers}
            handleIncorrectAnswers={handleIncorrectAnswers}
            setFlip={setFlip}
            flip={flip}
          />}
        </>
      ) : null }
      {noCards && (
        <ScoreBoard
          correctCount={correctCount}
          totalCount={selectedCards?.length}
          incorrectAnswers={incorrectAnswers}
          cards={selectedCards}
        />
      )}
      <Link to="/">
        <Button className={"back-to-dashboard-btn"} value={"Exit"} />
      </Link>
    </div>
    // </ChakraProvider>
  );
}
