import React, { useEffect, useState } from 'react';
import '../../styles/fiscalias.css';
import axios from 'axios';
import ReactModal from 'react-modal';


const VerTodas = ({ fiscaliac }) => {
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
      } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
      }
    };

    fetchNumerosTelefono();
    fetchUbicaciones();
  }, [fiscaliac.FiscaliaID]);

  const mostrarNumerosTelefono = () => {
    const telefonos = numerosTelefono.map(numero => numero.NumeroTelefono);
    const numerosTelefonoString = telefonos.join('\n');
    alert(`Números de teléfono de ${fiscaliac.Nombre}:\n\n${numerosTelefonoString}`);
  };
  const mostrarNumerosTelefono1 = () => {
    setModalOpen(true);
  };


  const getUbicacionNombre = (ubicacionId) => {
    console.log(ubicaciones);
    const ubicacion = ubicaciones.find(ubicacion => ubicacion.ID === ubicacionId);
    return ubicacion ? ubicacion.Direccion : '';
  };

  return (
    <div className="fiscalia-card">
      <h3 className="fiscalia-nombre">{fiscaliac.Nombre}</h3>
      <p className="fiscalia-ubicacion">{getUbicacionNombre(fiscaliac.UbicacionID)}</p>

      

      <button className="actualizar-ubicacion" onClick={mostrarNumerosTelefono1}>
        Ver números de teléfono
      </button>
    </div>
  );
};

export default VerTodas;
