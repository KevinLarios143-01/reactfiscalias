import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const [activeMenu, setActiveMenu] = useState("home");
    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="header__content">
                            <Link to="/" className="header__logo">
                                <img src="https://www.ubicaciones.cl/img/logo.png" alt="" />
                            </Link>
                            <ul className="header__menu">
                                <li>
                                    <Link to="/" className={activeMenu === "home" ? "active" : ""} onClick={() => setActiveMenu("home")}>Home</Link>
                                </li>
                                <li>
                                    <Link to="/about" className={activeMenu === "about" ? "active" : ""} onClick={() => setActiveMenu("about")}>About</Link>
                                </li>
                            </ul>
                            <div className="header__actions">
                                <div className="header__toggle">
                                    <i className="fa fa-bars"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;