import React from "react";
import "./styles/Home.css";
//import logo from "../images/MP_logo.png";

import logo from "../images/lofis.png";
function Home() {
    return (
        <div className="welcome-container">
            <img src={logo} alt="Logo" className="welcome-logo" />
            <h1 className="welcome-title">¡Bienvenido!</h1>
            <p className="welcome-description">Administración de Fiscalías.</p>
            <button className="welcome-button">Comenzar</button>
        </div>
    );

}

export default Home;