import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FisCard from './components/FisCard';


const Fiscalias = () => {

    const [fiscalias, setFiscalias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api');
                setFiscalias(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {
                fiscalias.map((fiscalia) => (
                    <FisCard key={fiscalia.FiscaliaID} fiscaliac={fiscalia} />

                ))
            }
        </div>
    );
}

export default Fiscalias;