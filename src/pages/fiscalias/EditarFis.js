import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/fiscaliasU.css";

const FiscaliasView = () => {
    const [fiscalias, setFiscalias] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFiscalia, setSelectedFiscalia] = useState(null);
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevaUbicacionID, setNuevaUbicacionID] = useState('');

    useEffect(() => {
        const fetchFiscalias = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api');
                setFiscalias(response.data);
            } catch (error) {
                console.error('Error al obtener las fiscalias:', error);
            }
        };

        fetchFiscalias();
    }, []);

    const openModal = (fiscalia) => {
        setSelectedFiscalia(fiscalia);
        setNuevoNombre(fiscalia.Nombre);
        setNuevaUbicacionID(fiscalia.UbicacionID);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedFiscalia(null);
        setNuevoNombre('');
        setNuevaUbicacionID('');
    };

    const handleNombreChange = (event) => {
        setNuevoNombre(event.target.value);
    };

    const handleUbicacionIDChange = (event) => {
        setNuevaUbicacionID(event.target.value);
    };

    const handleUpdateFiscalia = async () => {
        if (!selectedFiscalia || !nuevoNombre || !nuevaUbicacionID) {
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/fiscalias/${selectedFiscalia.FiscaliaID}`, {
                nuevoNombre,
                nuevaUbicacionID,
            });

            // Actualizar la lista de fiscalias después de la actualización exitosa
            const updatedFiscalias = fiscalias.map((fiscalia) => {
                if (fiscalia.FiscaliaID === selectedFiscalia.FiscaliaID) {
                    return { ...fiscalia, Nombre: nuevoNombre, UbicacionID: nuevaUbicacionID };
                }
                return fiscalia;
            });

            setFiscalias(updatedFiscalias);
            closeModal();
        } catch (error) {
            console.error('Error al actualizar la fiscalía:', error);
        }
    };

    return (
        <div className="fiscalias-view">
            <h2>Fiscalias</h2>
            {fiscalias.map((fiscalia) => (
                <div key={fiscalia.FiscaliaID}>
                    <h3>{fiscalia.Nombre}</h3>
                    <p>ID: {fiscalia.FiscaliaID}</p>
                    <p>Ubicación ID: {fiscalia.UbicacionID}</p>
                    <button className="edit-button" onClick={() => openModal(fiscalia)}>Editar</button>
                    <hr />
                </div>
            ))}

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Fiscalía</h2>
                        <label htmlFor="nombre">Nuevo Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nuevoNombre}
                            onChange={handleNombreChange}
                        />
                        <label htmlFor="ubicacion">Nueva Ubicación ID:</label>
                        <input
                            type="text"
                            id="ubicacion"
                            value={nuevaUbicacionID}
                            onChange={handleUbicacionIDChange}
                        />
                        <div className="modal-buttons">
                            <button className="cancel-button small" onClick={closeModal}>Cancelar</button>
                            <button className="update-button small" onClick={handleUpdateFiscalia}>Actualizar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiscaliasView;
