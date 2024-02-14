import React, { useState, useEffect, useContext, useRef } from "react";
import FlashcardList from "./FlashcardList";
import Sidebar from "./Sidebar";
import "../Styles-HomePageComponents/App.css";
import DeckForm from "./DeckForm";
import Button from "./Button";
import Form from "./Form";
import NoCardsState from "./NoCardsState";
import { ChakraProvider } from "@chakra-ui/react";
import LoadingPage from "./LoadingPage";
import { ToastContainer } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import supabase from "../config/supabaseClient";
import Login from "../Login";
import { Slide, Zoom, Bounce } from "react-toastify";
import {ReactComponent as LogOut} from "../assets/logouticon.svg"
import {Redirect} from "react-router-dom"


import {
  DeckContext,
  CardContext,
  FormVisibilityContext,
  ConfirmModalContext,
} from "../MainApp";

function App() {
  const { cards, setCards } = useContext(CardContext);
  const {decks, setDecks} = useContext(DeckContext);
  const { showForm, setShowForm } = useContext(FormVisibilityContext);
  const [showDeckForm, setShowDeckForm] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState("All Cards");
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const deckInputRef = useRef(null);
  const [deckClicked, setDeckClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [formType, setFormType] = useState("");

  const [cardsFetchError, setCardsFetchError] = useState(null);
  const [decksFetchError, setDecksFetchError] = useState(null);

  // const logout = async ()=>{
  //   const {error} = await supabase.auth.signOut();
  //   if(error===null){
  //     Redirect("/login");
  //   }
  // }


  const fetchCards = async () => {
    const { data, error } = await supabase.from("cards").select(`*`).order('index', { ascending: true });

    if (error) {
      setCardsFetchError("Could not fetch the cards");
      setCards(null);
    }
    if (data) {
      setCards(data);
      setCardsFetchError(null);
    }
  };
  const fetchDecks = async () => {
    const { data, error } = await supabase.from("decks").select().order('index', { ascending: true });;

    if (error) {
      setDecksFetchError("Could not fetch the decks");
      setDecks(null);
    }
    if (data) {
      setDecks(data);
      setDecksFetchError(null);
    }
  };

  useEffect(() => {
    fetchDecks();
    fetchCards();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // const savedFlashcards = JSON.parse(localStorage.getItem("flashcards"));
    // if (savedFlashcards) {
    //   setCards(savedFlashcards);
    // }
    setCurrentTitle("All Cards");
    setSelectedDeckId("all-cards-deck");
  }, []);

  const handleAddCardButton = () => {
    setFormType(prev=>"Add");
    // formType="Add";
    setShowForm(!showForm);
    // console.log(formType);
  };

  // console.log(formType)

  const handleShowDeckForm = () => {
    setShowDeckForm(true);
    setTimeout(() => deckInputRef.current.focus(), 300);
  };

  const handleDeckChange = (e) => {
    const deckName = e.target.getAttribute("value");
    const id = e.target.id;
    // console.log(id);
    // console.log(formType);
    setSelectedDeckId(id);
    setSelectedDeck(deckName); 
    setCurrentTitle(deckName);
  };

  useEffect(() => {

    if(cards===null){
      return
    }
    const filterCards = () => {
      if (selectedDeckId === "all-cards-deck") {
        return cards;
      } else {
        return (cards!==null && cards.filter((card) => selectedDeckId === card.deckID));
      }
    };

    const filteredCards = filterCards();
    setSelectedCards(filteredCards);

    setShowEmptyState(filteredCards?.length === 0);
  }, [selectedDeck, cards]);




  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="master-container">
          <div className="sidebar-container">
            <Sidebar
              handleDeckChange={handleDeckChange}
              selectedID={selectedDeckId}
              className={`folder-name ${deckClicked ? "clicked" : ""}`}
              currentTitle = {currentTitle}
            >
              {showDeckForm && (
                <DeckForm
                  inputRef={deckInputRef}
                  handleFormClear={() => setShowDeckForm(false)}
                />
              )}
              <Button
                handleClick={handleShowDeckForm}
                className={"create-deck-btn"}
                value={"+ Create Deck"}
              />

            </Sidebar>
          </div>
          <div className="btn-cards-container">
            <div className="add-btn-container">
              <div
                className="title"
                style={{
                  color: "1E1E1E",
                  fontSize: "1.2rem",
                  marginLeft: "7px",
                  fontWeight: "600",
                }}
              >
                {currentTitle}{" "}
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "grey",
                    fontWeight: "400",
                  }}
                >
                  {/* {" "} */}({selectedCards?.length})
                </span>{" "}
              </div>
              <Button
                className="add-btn"
                handleClick={handleAddCardButton}
                value={"Add Card"}
              />
            </div>

            <div className="cards-container">
              {showForm && (
                <div className="form-container">
                  <Form formType={formType}/>
                </div>
              )}
              {showEmptyState ? (
                <NoCardsState />
              ) : (
                <FlashcardList flashcards={selectedCards} />
              )}
              
              <ToastContainer transition={Slide}/>

            </div>
            {/* <Button value ={<LogOut/>} className={"logout-btn"} handleClick={logout} /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
