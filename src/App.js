import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import useHttpHook from "./Hooks/FetchHook";

import LandingPage from "./LandingPage/LandingPage";
import MenuPage from "./shared/MenuPage/MenuPage";
import FullHomePage from "./HomePage/FullHomePage";
import OneCategory from "./HomePage/IndividualCategory/OneCategory";

export const DataContext = createContext();

function App() {
  const { error, loading, sendBackEnd, clearError } = useHttpHook();
  
  const [LoggedIn, setLoggedIn] = useState();
  useEffect(() => {
    setLoggedIn(JSON.parse(window.sessionStorage.getItem("logIn")));
    
   
  });
  const loggingIn = async (res) => {
    try {
      const data = await sendBackEnd(
        "http://localhost:3001/person/create",
        { "Content-Type": "application/json" },
        "POST",
        JSON.stringify({
          name: res.name,
          facebookId: res.id,
        })
      );
      
      window.sessionStorage.setItem("person", JSON.stringify(data.person));
      window.sessionStorage.setItem("logIn", JSON.stringify(true));
      setLoggedIn(JSON.parse(window.sessionStorage.getItem("logIn")));
    } catch (err) {
      console.log(err);
      window.sessionStorage.setItem("logIn", JSON.stringify(false));
      setLoggedIn(JSON.parse(window.sessionStorage.getItem("logIn")));
    }
  };
  function loggingOut(res) {
    window.sessionStorage.setItem("logIn", JSON.stringify(false));
    setLoggedIn(JSON.parse(window.sessionStorage.getItem("logIn")));
  }

  //landing page or no landing page, depending on login info
  return (
    <DataContext.Provider value={{ LoggedIn, loggingIn, loggingOut }}>
      {LoggedIn ? (
        <BrowserRouter>
          <MenuPage></MenuPage>
          <Switch>
            <Route path="/" exact>
              <FullHomePage></FullHomePage>
            </Route>
            <Route path="/one-category/:id">
              <OneCategory></OneCategory>
            </Route>
            <Route path="/find"></Route>
          </Switch>
        </BrowserRouter>
      ) : (
        <div className="element">
          {error && <h1>Something wrong{error}</h1>}
          <LandingPage></LandingPage>
        </div>
      )}
    </DataContext.Provider>
  );
}

export default App;
