import React, { useContext } from "react";
import QuizDeck from "./QuizDeck";
import { DeckContext } from "../MainApp";
import '../Styles-QuizPageComponents/QuizDecksList.css'

export default function QuizDecksList({ handleClick }) {
  const { decks, setDecks } = useContext(DeckContext);

  return (
    <div className="quiz-decks-list">
    <div style={{marginBottom:'1rem', fontSize:'1.3rem', color:'white',fontWeight:500}}>Pick A Set</div>
    {decks?.length===0 && <div style={{color:'white', opacity:'0.6'}}>No Set To Play</div>}
      {decks?.map((deck, index) => (
        <QuizDeck key={index} deckName={deck.deck} id={`quiz-deck-${deck.id}`} handleClick={handleClick} />
      ))}
    </div>
  );
}
