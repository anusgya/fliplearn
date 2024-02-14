import React, { useState, useContext, useEffect } from "react";
import "../Styles-HomePageComponents/Form.css";
import supabase from "../config/supabaseClient";
import {
  DeckContext,
  CardContext,
  // AddFormDataContext,
  FormVisibilityContext,
} from "../MainApp";
import Button from "./Button";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Form({ formType }) {
  const { decks } = useContext(DeckContext);
  const { showForm, setShowForm } = useContext(FormVisibilityContext);
  const { cards, setCards } = useContext(CardContext);

  const notifyErrorInsertion = (error) =>
  toast.error(error, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const [formData, setFormData] = useState({
    id: "",
    deckID: "",
    deckName: "",
    question: "",
    answer: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    deckID: "",
    deckName: "",
    question: "",
    answer: "",
  });

  const notifyMissing = () =>
  toast.warning("Please enter all the values correctly", {
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
  toast.success("Card added successfully!", {
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
  toast.error("Error adding card", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });


  // const handleFlashcard = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('cards')
  //       .insert([newFlashcard]);

  //     if (error) {
  //       console.error('Error ing flashcard:', error);
  //     } else {
  //       console.log('Flashcard added successfully:', data);
  //       // Clear the input fields after successful insertion
  //       setNewFlashcard({
  //         question: '',
  //         answer: '',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.deckName || !formData.question || !formData.answer) {
      notifyMissing();
      return;
    }
    const { data, error } = await supabase
      .from("cards")
      .insert({id:formData.id, question:formData.question, answer:formData.answer, deckID:formData.deckID})
      .select();

    if (error) {
      notifyError();
    } else{
      notifySuccess();
    }

    setFormData({
      id: "",
      deckID: formData.deckID,
      deckName: formData.deckName,
      question: "",
      answer: "",
    });

    setCards((prevCards) => {
      return [...prevCards, formData];
    });

    // if(formType==="Add"){
    //   handleSetNewCards(AddFormData);
    //   setAddFormData((prev) => ({
    //     ...prev,
    //     id: "",
    //     question: "",
    //     answer: "",
    //   }));
    // }
  };

  const handleChange = (e) => {
    if (formType === "Add") {
      const { name, value } = e.target;
      let id = v4();
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        id: id,
      }));
    }
  };

  const handleDeckSelect = (e) => {
    const { value } = e.target;

    const selectedDeck = decks.find((deck) => {
      return deck.deck === value;
    });

    const deckID = selectedDeck.id;

    setFormData((prevData) => ({
      ...prevData,
      deckID: deckID,
      deckName: value,
    }));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      id: "",
      deckID: "",
      deckName: "",
      question: "",
      answer: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flashcard-form">
      <div className="form-group">
        <label htmlFor="deck">Decks</label>
        <select
          id="deck"
          name="deck"
          value={formData.deckName}
          onChange={handleDeckSelect}
        >
          <option>Select Deck</option>
          {Array.isArray(decks)?
            (decks.map((deck) => (
              <option key={deck.id} value={deck.deck} id={deck.id}>
                {deck.deck}
              </option>
            ))):(
              null
            )}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="question">Question</label>
        <input
          onFocus={(e) => e.preventDefault()}
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange} //  the event handler for the question field
        />
      </div>
      <div className="form-group">
        <label htmlFor="answer">Answer</label>
        <textarea
          type="text"
          id="answer"
          name="answer"
          value={formData.answer}
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
          handleClick={handleCloseForm}
          value={"Close"}
        />
        <Button className={"submit-btn"} value={"Add Card"} />
      </div>
    </form>
  );
}
