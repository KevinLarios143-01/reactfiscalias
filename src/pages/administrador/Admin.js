import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faMapMarkerAlt, faBuilding, faEdit } from '@fortawesome/free-solid-svg-icons';

import '../styles/administrador.css'; // Importar el archivo CSS
import logoImage from '../../images/lofis.png'; // Importar la imagen del logo

function Menu() {
    return (
        <div>    <div className="menu-container">
            <div className="menu-logo">
                <img src={logoImage} alt="Logo" />
                <span>Panel Principal</span>
            </div>
            <nav className="menu-options">
                <ul>
                    <li>
                        <Link to="/admin/agregar-telefono">
                            <FontAwesomeIcon icon={faPhoneAlt} />
                            <span>Agregar Teléfono a Fiscalía</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/crear-ubicacion">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <span>Crear Nueva Ubicación</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/crear-fiscalia">
                            <FontAwesomeIcon icon={faBuilding} />
                            <span>Crear Fiscalía</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/actualizar-fiscalia">
                            <FontAwesomeIcon icon={faEdit} />
                            <span>Actualizar Fiscalía</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
            <div className="texto-inferior">
                <p>Panel del Administrador</p>
            </div>
        </div>

    );
}

export default Menu;
