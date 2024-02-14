import React, { useState, useContext } from "react";
import Flashcard from "./Flashcard";
import "../Styles-HomePageComponents/Flashcard.css";
import { CardContext } from "../MainApp";

export default function FlashcardList({ flashcards }) {
  return (
    <div className="card-grid">
      {Array.isArray(flashcards) ? (
        flashcards.map((flashcard, index) => {
          return (
            <Flashcard flashcard={flashcard} key={index} id={flashcard.id} />
          );
        })
      ) : (
        null
      )}
    </div>
  );
}