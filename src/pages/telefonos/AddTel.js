import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/telefonos.css'; // Importar el archivo CSS

function InsertarTelefonoFiscaliaView() {
  const [FiscaliaID, setFiscaliaID] = useState(0);
  const [NumeroTelefono, setNumeroTelefono] = useState('');
  const [fiscalias, setFiscalias] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtener la lista de fiscalías desde el servidor
    const fetchFiscalias = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api');
        setFiscalias(response.data);
      } catch (error) {
        console.error('Error al obtener las fiscalías:', error);
      }
    };

    fetchFiscalias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que los campos no estén vacíos
    if (FiscaliaID === 0 || NumeroTelefono === '') {
      setMessage('Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/telefonos', {
        FiscaliaID,
        NumeroTelefono,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error al insertar el teléfono:', error);
      setMessage('Error al insertar el teléfono');
    }
  };

  return (
    <div>
      <div className="insertar-telefono-container">
        <h2>Insertar Teléfono a Fiscalía</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fiscalia">Fiscalía:</label>
            <select
              id="fiscalia"
              value={FiscaliaID}
              onChange={(e) => {
                setFiscaliaID(e.target.value);
                console.log(e.target.value);
              }}
              className="select-fiscalia" // Agregar la clase al select
            >
              <option value="">Seleccione una fiscalía</option>
              {fiscalias.map((fiscalia) => (
                <option key={fiscalia.FiscaliaID} value={fiscalia.FiscaliaID}>
                  {fiscalia.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numeroTelefono">Número de Teléfono:</label>
            <input
              type="text"
              id="numeroTelefono"
              value={NumeroTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
          </div>
          <button type="submit">Insertar Teléfono</button>
        </form>
        {message && <p>{message}</p>}
        <br></br>
        <Link className="regresar-btn" to="/admin">Regresar al Menú del Administrador</Link>
      </div>
    </div>
  );
}

export default InsertarTelefonoFiscaliaView;
