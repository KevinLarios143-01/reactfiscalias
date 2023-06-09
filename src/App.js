import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Fiscalias from "./pages/fiscalias/Fiscalias";
import AgregarFis from "./pages/fiscalias/AgregarFis";
import EditarFis from "./pages/fiscalias/EditarFis";
import FiscaliaID from "./pages/fiscalias/FiscaliaId";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import AgregarTel from "./pages/telefonos/AddTel";
import CrearUbi from "./pages/ubicaciones/CrearUbi";
import './pages/styles/administrador.css'; // Importar el archivo CSS
import AdminPanel from "./pages/administrador/Admin";
function App() {
    return (

        <BrowserRouter>
            <div className="App">
                <Navbar></Navbar>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fiscalias" element={<Fiscalias />} />
                    <Route path="/fisid/:id" element={<FiscaliaID />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin/agregar-telefono" element={<AgregarTel />} />
                    <Route path="/admin/crear-ubicacion" element={<CrearUbi />} />
                    <Route path="/admin/crear-fiscalia" element={<AgregarFis />} />
                    <Route path="/admin/actualizar-fiscalia" element={<EditarFis />} />
                    
                </Routes>
            </div>
        </BrowserRouter >
    );

}


export default App;
