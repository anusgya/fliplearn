import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./Home Page Components/App";
import QuizPage from "./Quiz Page Components/QuizPage";
import supabase from "./config/supabaseClient";
import Login from "./Login";
import CheckSession from "./checkLogin";

const DeckContext = createContext();
const CardContext = createContext();
const FormVisibilityContext = createContext();
// const FormDataContext = createContext();
const ConfirmModalContext = createContext();

export default function MainApp() {

  const [decks, setDecks] = useState(null);
  const [cards, setCards] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  

  // const fetchCards = async () => {
  //   const { data, error } = await supabase.from("cards").select(`*`).order('index', { ascending: true });

  //   if (error) {
  //     setCardsFetchError("Could not fetch the cards");
  //     setCards(null);
  //   }
  //   if (data) {
  //     setCards(data);
  //     setCardsFetchError(null);
  //   }
  // };
  // const fetchDecks = async () => {
  //   const { data, error } = await supabase.from("decks").select().order('index', { ascending: true });;

  //   if (error) {
  //     setDecksFetchError("Could not fetch the decks");
  //     setDecks(null);
  //   }
  //   if (data) {
  //     setDecks(data);
  //     setDecksFetchError(null);
  //   }
  // };

  // useEffect(() => {
  //   fetchDecks();
  //   fetchCards();
  // }, []);
  

  return (
    <Router>
      <CardContext.Provider value={{ cards, setCards }}>
        <DeckContext.Provider value={{ decks, setDecks }}>
          <FormVisibilityContext.Provider value={{ showForm, setShowForm }}>
            <ConfirmModalContext.Provider
              value={{ showConfirmModal, setShowConfirmModal }}
            >
              <Switch>
              <Route exact path="/login">
                <Login/>
              </Route>
                <Route exact path="/">
              <CheckSession>
                  <App />
                  </CheckSession>
                </Route>
                <Route exact path="/quiz">
                <CheckSession>
                  <QuizPage />
                  </CheckSession>
                </Route>
              </Switch>
            </ConfirmModalContext.Provider>
          </FormVisibilityContext.Provider>
        </DeckContext.Provider>
      </CardContext.Provider>
    </Router>
  );
}

export { DeckContext, CardContext, FormVisibilityContext, ConfirmModalContext };
