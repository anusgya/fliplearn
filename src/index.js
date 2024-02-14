import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Home Page Components/App";
import MainApp from "./MainApp";
import "react-toastify/dist/ReactToastify.css";
// import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
      <MainApp />
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
