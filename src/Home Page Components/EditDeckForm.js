import React, { useState, useContext, useRef, useEffect } from "react";
import "../Styles-HomePageComponents/DeckForm.css";
import { DeckContext } from "../MainApp";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import Button from "./Button";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../config/supabaseClient";
import ReactModal from "react-modal";

export default function DeckForm({
  id,
  status,
  setStatus,
  prevData,
  setPrevData,
  handleEdit,
}) {
  const { decks, setDecks } = useContext(DeckContext);
  const [showToast, setShowToast] = useState(false);

  const formRef = useRef(null);

  const notifySuccess = () =>
  toast.success("Deck updated succesfully", {
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


  const handleDeckFormData = (e) => {
    // const id = v4();
    const { value } = e.target;
    // console.log(value)
    setPrevData({
      id: id,
      deck: value,
    });
  };

  const handleConfirmEdit = async (e) => {
    e.stopPropagation();
    setStatus(false);

    const { data, error } = await supabase
      .from("decks")
      .update(prevData)
      .eq("id", id)
      .select();

    if (error) {
      if(error.code==='23505'){
        notifyError(`${prevData.deck} already exists. Cannot update Deck.`);
        return;
      }else{
        notifyError("Error updating deck")
      }
    } else {
      notifySuccess('Deck updated successfully');
    }

    const updatedDecks = decks.map((deck) =>
      deck.id === id ? (data ? data[0] : deck) : deck
    );
    setDecks(updatedDecks);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setStatus(false);
  };

  return (
    <ReactModal
      isOpen={status}
      overlayClassName={"overlay"}
      className={"edit-deck-form-container"}
      handleClick={(e)=>e.stopPropagation()}
    >
      <form
        className="edit-deck-form"
        onSubmit={handleConfirmEdit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-deck-input-container">
          <input
            // ref={inputRef}
            type="text"
            id="deck"
            name="deck"
            value={prevData.deck}
            onChange={handleDeckFormData}
          ></input>
        </div>
      </form>
      <div className="edit-btns-container">
        <Button
          className={"close-edit-form-btn"}
          value={"Cancel Edit"}
          handleClick={handleCancelEdit}
        />
        <Button
          className={"save-edit-form-btn"}
          value={"Save Deck"}
          handleClick={handleConfirmEdit}
        />
      </div>
      {/* {showToast && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      )} */}
    </ReactModal>
  );
}
