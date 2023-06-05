import React from "react";
import "./styles/Home.css";
import logo from "../images/MP_logo.png";
import { Link } from 'react-router-dom';

//import logo from "../images/lofis.png";
function Home() {
    return (
        <div className="welcome-container">
            <img src={logo} alt="Logo" className="welcome-logo" />
            <h1 className="welcome-title">¡Bienvenido!</h1>
            <p className="welcome-description">Administración de Fiscalías.</p>
            <Link to="/fiscalias">
                <button className="welcome-button">Comenzar</button>
            </Link>
        </div>
    );

}

export default Home;