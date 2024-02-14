import React, { useState, useContext, useEffect } from "react";
import { DeckContext, CardContext } from "../MainApp";
// import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { ReactComponent as EditIcon } from "../assets/edit icon.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete icon.svg";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
// import ReactModal from "react-modal";
import EditDeckForm from './EditDeckForm.js';
import "../Styles-HomePageComponents/ConfirmModal.css";
import { toast } from "react-toastify";
import supabase from "../config/supabaseClient";

// import { ModalContent } from "@chakra-ui/react";

export default function SidebarData({
  id,
  value,
  handleDeckChange,
  className,
  selectedID,
}) {
  const [deckIsHovered, setDeckIsHovered] = useState(false);

  const { decks, setDecks } = useContext(DeckContext);
  const [formData, setFormData] = useState({
    id:"",
    deck:"",
  });

  const notifyDeletion = (message) => toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // progress: ,
    // transition:'flip',
    theme: "colored",

    });
  const notifyError = (error) => toast.error(error, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // progress: ,
    // transition:'flip',
    theme: "colored",
    });


  const { cards, setCards } = useContext(CardContext);

  const [showEditForm, setShowEditForm] = useState(false);
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const [ConfirmDelete, setConfirmDelete] = useState(false);

  const selectedStyle =
    id === selectedID
      ? { backgroundColor: "rgba(142, 142, 142, 0.20)" }
      : { backgroundColor: "" };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditForm(true);
    handleGetDeck();
  };

  const handleGetDeck= async (e)=>{
    const { data, error } = await supabase
      .from("decks")
      .select()
      .eq("id", id)
      .single()

    if (error) {
      console.log("There was an error fetching deck");
    }
    if (data) {
      setFormData({id:data.id,deck:data.deck});
    }
  }


  const handleDeckDelete = (e) => {
    e.stopPropagation();
    setConfirmDelete(true);
    // setDeckIsHovered(false);
  };

  // useEffect(()=>{

  // },[decks])

  const handleConfirmDeckDelete = async (e) => {
    e.stopPropagation();
    setConfirmDelete(false);
    setDeckIsHovered(false);

    const { error } = await supabase.from("decks").delete().eq("id", id);

    if(error){
      notifyError("There was an error deleting deck");
    }else{
      notifyDeletion("Deck deleted successfully");
    }
    const updatedDecks = decks.filter((deck, index) => id !== deck.id);
    setDecks(updatedDecks);


    const updatedCards = cards.filter((card) => card.deckID !== id);
    setCards(updatedCards);
  }

  const handleCancelDeckDelete = (e) => {
    e.stopPropagation();
    setConfirmDelete(false);
    setDeckIsHovered(false);
  }

  return (
    <div>
      <div
        id={id}
        className={className}
        onMouseEnter={() => setDeckIsHovered(true)}
        onMouseLeave={() => setDeckIsHovered(false)}
        onClick={handleDeckChange}
        value={value}
        style={selectedStyle}
      >
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="icons">
            <path
              id="Vector"
              d="M12.6 14.5H1.4C1.0287 14.5 0.672601 14.3156 0.41005 13.9874C0.1475 13.6592 0 13.2141 0 12.75V2.25C0 1.78587 0.1475 1.34075 0.41005 1.01256C0.672601 0.684374 1.0287 0.5 1.4 0.5H12.6C12.9713 0.5 13.3274 0.684374 13.5899 1.01256C13.8525 1.34075 14 1.78587 14 2.25V12.75C14 13.2141 13.8525 13.6592 13.5899 13.9874C13.3274 14.3156 12.9713 14.5 12.6 14.5ZM1.4 2.25V12.75H12.6V2.25H1.4ZM2.8 4.875H11.2V6.625H2.8V4.875ZM2.8 8.375H9.8V10.125H2.8V8.375Z"
              fill="#797873"
            />
          </g>
        </svg>
        {value}
        {deckIsHovered && (
          <div className="edit-del-btns-container">
            <Button
              className={"edit-btn"}
              handleClick={handleEdit}
              value={<EditIcon />}
            />

            <Button
              className={"del-btn"}
              handleClick={handleDeckDelete}
              value={<DeleteIcon />}
            />
          </div>
        )}

        <ConfirmModal
          state={ConfirmDelete}
          item={"deck"}
          handleCancel={handleCancelDeckDelete}
          handleConfirm={handleConfirmDeckDelete}
          content={"All the associated cards will also be deleted."}
        /> 
        <EditDeckForm id={id} status={showEditForm} setStatus={setShowEditForm} prevData={formData} setPrevData={setFormData} handleEdit={handleEdit} />

        {/* )} */}
      </div>
    </div>
  );
}
