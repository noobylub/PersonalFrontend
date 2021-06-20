import React, { useContext, useState } from "react";
import "./Homepage.css";
import { DataContext } from "../../App";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";



Modal.setAppElement("#root");
function MenuPage() {
  const history = useHistory()
  const { loggingOut } = useContext(DataContext);
  const [opened, setOpened] = useState(false);
 
  
  const toClose = () => {
    setOpened(false);

    
  };
  const toOpen = () => {
    setOpened(true);
   
  };
  function leadHome(){
      history.push("/")
  }
 
  return (
    <div className="entire-thing">
      <button className="menu-button" onClick={toOpen}>
        <h1>Menu</h1>
      </button>
      <Modal
        isOpen={opened}
        onRequestClose={toClose}
        overlayClassName="overlay"
        className="modal"
      >
        <div className="content">
          
          <button onClick={loggingOut} className="logout">
            <h1>Logout</h1>
          </button>
          <button onClick={leadHome} className="home-page">
            <h1>Home</h1>
          </button>
        </div>
      </Modal>
    </div>
  );
}
export default MenuPage;
