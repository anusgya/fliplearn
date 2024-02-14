import React, { useContext, useState, useEffect } from "react";
import { CardContext, DeckContext } from "../MainApp";
import { ReactComponent as DeckIcon } from "../assets/deckicon.svg";
import "../Styles-QuizPageComponents/QuizDeck.css";

export default function QuizDeck({ deckName, id, handleClick }) {
  const { decks, setDecks } = useContext(DeckContext);
  const { cards } = useContext(CardContext);
  const [totalCards, setTotalCards] = useState(0);

  // if()

  useEffect(() => {
    const filteredCards = cards?.filter((card) => {
      const deckID = `quiz-deck-${card.deckID}`;
      return deckID === id;
    });
    setTotalCards(filteredCards?.length);
  }, [cards, deckName]);

  return (
    <div id={id} className="quiz-deck" value={deckName} onClick={handleClick}>
      <div style={{ marginRight: "7px" }}>
        <DeckIcon />
      </div>
      <div className="quiz-deck-contents">
        <div className="quiz-deck-title" value={deckName}>
          {deckName}
        </div>
        <div className="cards-count">{totalCards} cards</div>
      </div>
    </div>
  );
}
