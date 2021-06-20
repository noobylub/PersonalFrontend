import React, { useState, useEffect, useContext } from "react";
import "./LandingPage.css";
import { DataContext } from "../App";
import FacebookLogin from "react-facebook-login";

const LandingPage = () => {
  const { loggingIn } = useContext(DataContext);
 
  return (
    <div className="landing-page">
      {/* The first part */}
      <div className="main-content-1">
        <div className="first-part">
          <div className="message">
            <h1>
              <span className="different">List</span> your favorite item, so people can know you
            </h1>
            <h1>
              <span className="different">Find</span> new People with similar
              interest
            </h1>
            <h1 className="last">
              <span className="different">Befriend</span> new People with
              similar interest
            </h1>

            <FacebookLogin
              appId="185647653452806"
              fields="name, email"
              callback={loggingIn}
            ></FacebookLogin>
          </div>
        </div>
      </div>
      <hr className="separation-line" />
      {/* <div className="second-part">
        <div className="text-part">
          <h1>Create a list of your favorite things so people know you</h1>
          <div className="message-box">
            <div className="first text">
              <h2>
                <span className="different">Create</span> a category of your
                favorite items, like Sport Teams, Books
              </h2>
              <p>
                The category are the categories of items that you like, the
                types of things that you like, for example, sport teams,
                favorite types of sports, and or favorite types of books. It is
                simply the type of things that you like
              </p>
            </div>
            <div className="second text">
              <h2>
                <span className="different">Fill</span> the items in that
                category with its respective things that you like
              </h2>
              <p>
                So by then, you should have a category of things, now you would
                have to fill that category with its respective things that you
                like.
              </p>
            </div>
          </div>
        </div>
        <div className="img">
          <img
            src="https://i.ytimg.com/vi/2QvOxa_7wEw/maxresdefault.jpg"
            alt=""
          />
        </div>
      </div> */}
    </div>
  );
};
export default LandingPage;
