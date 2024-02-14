import React, { useState, useContext, useRef, useEffect } from "react";
import "../Styles-HomePageComponents/DeckForm.css";
import { DeckContext } from "../MainApp";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import Button from "./Button";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../config/supabaseClient";

export default function DeckForm({ inputRef, handleFormClear }) {
  const { decks, setDecks } = useContext(DeckContext);
  const [showToast, setShowToast] = useState(false);

  const formRef = useRef(null);

  const notifySuccess = () =>
    toast.success("Deck Created Succesfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = (error) =>
    toast.error(error, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // console.log(toast)

  const [deckFormData, setDeckFormData] = useState({
    id: "",
    deck: "",
  });

  const handleDeckFormData = (e) => {
    const id = v4();
    const { value } = e.target;
    // console.log(value)
    setDeckFormData({
      id: id,
      deck: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { data, error } = await supabase
      .from("decks")
      .insert([deckFormData])
      .select();

    if (error) {
      // console.log(error)
      if (error.code === "23505") {
        notifyError(`"${deckFormData.deck}" already exists`);
      } else {
        notifyError("Error creating deck");
      }
      return;
    } else {
      notifySuccess();
    }
    setDecks((prevDecks) => {
      if (prevDecks !== null) return [...prevDecks, deckFormData];
    });
    setDeckFormData({
      id: "",
      deck: "",
    });
    handleFormClear();
    // showToast(prev=>true);
    // notifySuccess();
    // setShowToast(true);

    // notifySuccess();
  };

  return (
    <div className="add-deck-form-container">
      <form className="add-deck-form" onSubmit={handleSubmit}>
        <div className="deck-input-container">
          <input
            ref={inputRef}
            type="text"
            id="deck"
            name="deck"
            value={deckFormData.deck}
            onChange={handleDeckFormData}
          ></input>
        </div>
      </form>
      <Button
        className={"close-form-btn"}
        value={<CloseIcon />}
        handleClick={handleFormClear}
      />
    </div>
  );
}
