import React from "react";
import HomePage from './HomePage';
import Categories from './Categories';
import "./HomePage.css";

function  FullHomePage() {

    return (
        <div className="full-home-page">
            <HomePage></HomePage>
            {/* Categories */}
            <Categories></Categories>
        </div>
    )

}
export default FullHomePage;