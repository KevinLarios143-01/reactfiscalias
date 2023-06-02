import React, { useEffect, useState } from 'react';
import '../../styles/fiscalias.css';
import axios from 'axios';
import ReactModal from 'react-modal';


const FisCard = ({ fiscaliac }) => {
  const [numerosTelefono, setNumerosTelefono] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const fetchNumerosTelefono = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/telefonos/${fiscaliac.FiscaliaID}`);
        setNumerosTelefono(response.data);
      } catch (error) {
        console.error('Error al obtener los números de teléfono:', error);
      }
    };

    const fetchUbicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ubicaciones');
        setUbicaciones(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
      }
    };

    fetchNumerosTelefono();
    fetchUbicaciones();
  }, [fiscaliac.FiscaliaID]);

  const mostrarNumerosTelefono1 = () => {
    setModalOpen(true);
  };


  const getUbicacionNombre = (ubicacionId) => {
    console.log(ubicaciones);
    const ubicacion = ubicaciones.find(ubicacion => ubicacion.ID === ubicacionId);

    let ubis = ubicacion ? ubicacion.Direccion : '';


    let junto = ubis;
    return junto;
  };
  const getUbicacionNombre2 = (ubicacionId) => {
    console.log(ubicaciones);
    const ubicacion = ubicaciones.find(ubicacion => ubicacion.ID === ubicacionId);
    let Pais = ubicacion ? ubicacion.Pais : '';
    let Departamento = ubicacion ? ubicacion.Departamento : '';
    let Municipio = ubicacion ? ubicacion.Municipio : '';

    let junto = Pais + ', ' + Departamento + ', ' + Municipio;
    return junto;
  };

  return (
    <div className="fiscalia-card">
      <h3 className="fiscalia-nombre">{fiscaliac.Nombre}</h3>
      <p className="fiscalia-ubicacion">{getUbicacionNombre(fiscaliac.UbicacionID)}</p>
      <p className="fiscalia-ubicacion">{getUbicacionNombre2(fiscaliac.UbicacionID)}</p>

      {numerosTelefono.length > 0 && (
        <div className="numeros-telefono-list">
          <p>Números de teléfono:</p>
          <ul>
            {numerosTelefono.map(numero => (
              <li key={numero.Id}>{numero.NumeroTelefono}</li>
            ))}
          </ul>
        </div>
      )}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Números de teléfono"
        className="modal"
      >
        <h2>Números de teléfono de {fiscaliac.Nombre}</h2>
        <ul>
          {numerosTelefono.map(numero => (
            <li key={numero.Id}>{numero.NumeroTelefono}</li>
          ))}
        </ul>
        <button onClick={() => setModalOpen(false)}>Cerrar</button>
      </ReactModal>


      <button className="ver-telefonos-button" onClick={mostrarNumerosTelefono1}>
        Ver números de teléfono
      </button>
    </div>
  );
};

export default FisCard;
