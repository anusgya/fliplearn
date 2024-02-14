import React, { useState, useContext } from "react";
import { ReactComponent as EditIcon } from "../assets/edit icon.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete icon.svg";
import Button from "./Button";
import supabase from "../config/supabaseClient";
import EditCardForm from "./EditCardForm";
import { toast } from "react-toastify";

import {
  CardContext,
  FormVisibilityContext,
  // FormDataContext,
} from "../MainApp";
import { CardHeader } from "@chakra-ui/react";
import ConfirmModal from "./ConfirmModal";

export default function Flashcard({ flashcard, id }) {
  const [flip, setFlip] = useState(false);
  const { cards, setCards } = useContext(CardContext);
  // const { showForm, setShowForm } = useContext(FormVisibilityContext);
  // const { formData, setFormData } = useContext(FormDataContext);
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    deckID: "",
    deckName: "",
    question: "",
    answer: "",
  });

  const notifySuccess = () =>
    toast.success("Card deleted Succesfully!", {
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
    toast.error("Error deleting card", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleGetCard = async () => {

    const { data, error } = await supabase
      .from("cards")
      .select(
        `
        id, 
        question,
        answer,
        deckID, 
        decks ( deck )
        `
      )
      .eq("id", id)
      .single();

    if (data) {
      setFormData({
        id: data.id,
        deckID: data.deckID,
        deckName: data.decks.deck,
        question: data.question,
        answer: data.answer,
      });
    }
  };

  const handleEditCard = (e) => {
    e.stopPropagation();
    setShowEditForm(true);
    handleGetCard();
    // console.log(formData);
  };

  const handleCloseEditForm = (e) => {
    e.stopPropagation();
    setShowEditForm(false);
    // console.log(formData)
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowConfirmModal((prev) => true);
    setIsHovered((prev) => false);
  };

  const handleConfirmCardDelete = async (e) => {
    e.stopPropagation();

    const { error } = await supabase.from("cards").delete().eq("id", id);

    if (error) {
      notifyError();
    } else {
      notifySuccess();
    }

    const updatedCards = cards?.filter((card, index) => {
      return id !== card.id;
    });

    setCards(updatedCards);

    setShowConfirmModal((prev) => false);
    setIsHovered((prev) => false);
  };

  const handleCancelCardDelete = (e) => {
    e.stopPropagation();
    setShowConfirmModal((prev) => false);
    setIsHovered((prev) => false);
  };

  return (
    <div>
      <div
        className={`card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        id={id}
      >
        <div style={{ display: "none" }} value={flashcard.question}>
          {flashcard.deck}
        </div>

        <div className="front" value={flashcard.question}>
          {flashcard.question}
        </div>

        <div className="back" value={flashcard.answer}>
          {flashcard.answer}
        </div>
        {isHovered && !flip ? (
          <>
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "14px",
                fontSize: "10px",
                color: "#A6A6A6",
                fontWeight: "medium",
              }}
            >
              Question
            </div>
            <div className="edit-del-btns-container">
              <Button
                id={id}
                className={"edit-btn"}
                handleClick={handleEditCard}
                value={<EditIcon />}
              />
              <Button
                id={id}
                className={"del-btn"}
                handleClick={handleDelete}
                value={<DeleteIcon />}
              />
            </div>
          </>
        ) : null}

        {isHovered && flip ? (
          <div
            className="back"
            style={{
              position: "absolute",
              top: "-5px",
              right: "-4px",
              fontSize: "10px",
              color: "#A6A6A6",
              fontWeight: "medium",
            }}
          >
            Answer
          </div>
        ) : null}

        {/* {flip? (<div style={{position:'absolute'}}>Answer<div>:null)} */}
        <ConfirmModal
          state={showConfirmModal}
          handleConfirm={handleConfirmCardDelete}
          handleCancel={handleCancelCardDelete}
          item={"card"}
        />
      </div>
      <EditCardForm
        id={id}
        state={showEditForm}
        setState={setShowEditForm}
        handleEditCard={handleEditCard}
        handleCancelEdit={handleCloseEditForm}
        prevCardData={formData}
        setPrevCardData={setFormData}
      />
    </div>
  );
}
