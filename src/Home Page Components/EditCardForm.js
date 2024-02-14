import React, { useState, useContext, useEffect } from "react";
import "../Styles-HomePageComponents/Form.css";
import {
  DeckContext,
  CardContext,
  FormVisibilityContext,
} from "../MainApp";
import Button from "./Button";
import supabase from "../config/supabaseClient";
import ReactModal from "react-modal";
import "../Styles-HomePageComponents/Form.css"
import {toast} from "react-toastify"
import { v4 } from "uuid";

export default function EditCardForm({
  id,
  state,
  setState,
  prevCardData,
  setPrevCardData,
  handleEditCard,
  handleCancelEdit,
}) {
  const { decks } = useContext(DeckContext);
  const { cards, setCards } = useContext(CardContext);

  const notifyMissing = (info) =>
  toast.warning(info, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });


  const notifySuccess = () =>
  toast.success("Card Updated Succesfully!", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const notifyError = () =>
  toast.error("Error updating card", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEditCard(e);
    if (!prevCardData.deckName || !prevCardData.question || !prevCardData.answer) {
      notifyMissing("Please enter all the values correctly")
      return;
    }
    setState(false);
    const { data, error } = await supabase
      .from("cards")  
      .update({question:prevCardData.question, answer:prevCardData.answer, deckID:prevCardData.deckID})
      .eq("id", id)
      .select()

    if (error) {
      // console.log("Error updating card:", error);
      notifyError();
    } else {
      notifySuccess();
      // console.log("Card updated successfully:", data);
    }

    const updatedCards = cards.map(card => card.id === id ? data[0] : card);
    setCards(updatedCards);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrevCardData((prevData) => ({
      ...prevData,
      [name]: value,
      id: id,
    }));
  };

  const handleDeckSelect = (e) => {
    const { value } = e.target;

    const selectedDeck = decks.find((deck) => {
      return deck.deck === value;
    });

    const deckID = selectedDeck.id;

    setPrevCardData((prevData) => ({
      ...prevData,
      deckID: deckID,
      deckName: value,
    }));
  };

  return (
    <ReactModal
      isOpen={state}
      className={"form-group"}
      overlayClassName={"overlay"}
    >
      <form onSubmit={handleSubmit} className="flashcard-form">
        <div className="form-group">
          <label htmlFor="deck">Decks</label>
          <select
            id="deck"
            name="deck"
            value={prevCardData.deckName}
            onChange={handleDeckSelect}
          >
            <option>Select Deck</option>
            {decks?.map((deck) => (
              <option key={deck.id} value={deck.deck} id={deck.id}>
                {deck.deck}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            onFocus={(e) => e.preventDefault()}
            type="text"
            id="question"
            name="question"
            value={prevCardData.question}
            onChange={handleChange} // Add the event handler for the question field
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            type="text"
            id="answer"
            name="answer"
            value={prevCardData.answer}
            onChange={handleChange} // Add the event handler for the answer field
          />
        </div>
        <div
          className="btns-container"
          style={{
            width: "100%",
            marginTop: "10px",
            display: "flex",
            alignItems: "stretch",
            gap: "7px",
          }}
        >
          <Button 
            className={"close-btn"}
            handleClick={handleCancelEdit}
            value={"Cancel Edit"}
          />
          <Button
            className={"submit-btn"}
            value={"Save Card"}
            handleClick={handleSubmit}
          />
        </div>
      </form>
    </ReactModal>
  );
}
