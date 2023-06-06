import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/fiscalias.css";

const InsertarFiscalia = () => {
  const [nombre, setNombre] = useState('');
  const [ubicaciones, setUbicaciones] = useState([]);
  const [selectedUbicacion, setSelectedUbicacion] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ubicaciones');
        setUbicaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
      }
    };

    fetchUbicaciones();
  }, []);

  const handleInputChange = (event) => {
    setNombre(event.target.value);
  };

  const handleUbicacionChange = (event) => {
    setSelectedUbicacion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !selectedUbicacion) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/fiscalias', {
        Nombre: nombre,
        UbicacionID: selectedUbicacion,
      });

      setMensaje('Fiscalía insertada correctamente');
      setNombre('');
      setSelectedUbicacion('');
      console.log(response.data); // Maneja la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al insertar la fiscalía:', error);
    }
  };

  return (
    <div className="insertar-fiscalia">
      <h2>Insertar Nueva Fiscalía</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ubicacion">Ubicación:</label>
          <select
            id="ubicacion"
            value={selectedUbicacion}
            onChange={handleUbicacionChange}
            required
          >
            <option value="">Seleccione una ubicación</option>
            {ubicaciones.map((ubicacion) => (
              <option key={ubicacion.ID} value={ubicacion.ID}>
                {ubicacion.ID} - {ubicacion.Direccion}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Insertar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <br />
      <Link className="regresar-btn" to="/admin">Regresar al Menú del Administrador</Link>
    </div>
  );
};

export default InsertarFiscalia;
