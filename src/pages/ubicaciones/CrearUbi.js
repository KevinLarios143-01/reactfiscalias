import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Ubicaciones.css';


const InsertarUbicacion = () => {
  const [direccion, setDireccion] = useState('');
  const [pais, setPais] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [error, setError] = useState(null);
  const [ubicacionId, setUbicacionId] = useState(null);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/paises');
        setPaises(response.data);
      } catch (error) {
        setError('Error al obtener los países');
      }
    };

    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/departamentos');
        setDepartamentos(response.data);
      } catch (error) {
        setError('Error al obtener los departamentos');
      }
    };

    const fetchMunicipios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/municipios');
        setMunicipios(response.data);
      } catch (error) {
        setError('Error al obtener los municipios');
      }
    };

    fetchPaises();
    fetchDepartamentos();
    fetchMunicipios();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'direccion':
        setDireccion(value);
        break;
      case 'pais':
        setPais(value);
        setDepartamento('');
        setMunicipio('');
        break;
      case 'departamento':
        setDepartamento(value);
        setMunicipio('');
        break;
      case 'municipio':
        setMunicipio(value);
        break;
      default:
        break;
    }
  };

  const getFilteredDepartamentos = () => {
    if (pais) {
      return departamentos.filter((departamento) => departamento.PaisID === parseInt(pais));
    }
    return [];
  };

  const getFilteredMunicipios = () => {
    if (departamento) {
      return municipios.filter((municipio) => municipio.DepartamentoID === parseInt(departamento));
    }
    return [];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!direccion || !pais || !departamento || !municipio) {
      setError('Por favor, complete todos los campos');
      setUbicacionId(null);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/ubicaciones', {
        Direccion: direccion,
        Pais: pais,
        Departamento: departamento,
        Municipio: municipio,
      });

      setUbicacionId(response.data.ubicacionId);
      setError(null);
    } catch (error) {
      setError('Error al insertar la ubicación');
      setUbicacionId(null);
    }
  };

  return (
    <div className="insertar-ubicacion">
      <h2>Insertar Nueva Ubicación</h2>
      {error && <p>{error}</p>}
      {ubicacionId && (
        <p>
          Ubicación insertada correctamente. ID: {ubicacionId}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={direccion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="pais">País:</label>
          <select
            id="pais"
            name="pais"
            value={pais}
            onChange={handleInputChange}
            className="select-input"
          >
            <option value="">Seleccione un país</option>
            {paises.map((pais) => (
              <option key={pais.PaisID} value={pais.PaisID}>
                {pais.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="departamento">Departamento:</label>
          <select
            id="departamento"
            name="departamento"
            value={departamento}
            onChange={handleInputChange}
            className="select-input"
          >
            <option value="">Seleccione un departamento</option>
            {getFilteredDepartamentos().map((departamento) => (
              <option key={departamento.DepartamentoID} value={departamento.DepartamentoID}>
                {departamento.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="municipio">Municipio:</label>
          <select
            id="municipio"
            name="municipio"
            value={municipio}
            onChange={handleInputChange}
            className="select-input"
          >
            <option value="">Seleccione un municipio</option>
            {getFilteredMunicipios().map((municipio) => (
              <option key={municipio.MunicipioID} value={municipio.MunicipioID}>
                {municipio.Nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Insertar</button>
      </form>
      <br />
      <Link className="regresar-btn" to="/admin">Regresar al Menú del Administrador</Link>
    </div>
  );
};

export default InsertarUbicacion;
