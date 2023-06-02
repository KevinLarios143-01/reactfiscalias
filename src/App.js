import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Fiscalias from "./pages/fiscalias/Fiscalias";
import AgregarFis from "./pages/fiscalias/AgregarFis";
import EditarFis from "./pages/fiscalias/EditarFis";
import FiscaliaID from "./pages/fiscalias/FiscaliaId";
import About from "./pages/About";
import Navbar from "./components/Navbar";




function App() {
    return (

        <BrowserRouter>
            <div className="App">
                <Navbar></Navbar>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fiscalias" element={<Fiscalias />} />
                    <Route path="/addfis" element={<AgregarFis />} />
                    <Route path="/editfis/:id" element={<EditarFis />} />
                    <Route path="/fisid/:id" element={<FiscaliaID />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </BrowserRouter >
    );

}

export default App;
