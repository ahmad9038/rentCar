import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/userContext.jsx";
import { ListCarsContextProvider } from "./contexts/listCarsContext.jsx";
import { CarProvider } from "./contexts/carContext.jsx";
import { BookedCarsContextProvider } from "./contexts/bookedCarsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ListCarsContextProvider>
        <CarProvider>
          <BookedCarsContextProvider>
            <App />
          </BookedCarsContextProvider>
        </CarProvider>
      </ListCarsContextProvider>
    </UserProvider>
  </React.StrictMode>
);
