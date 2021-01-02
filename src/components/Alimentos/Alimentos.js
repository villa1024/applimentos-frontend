import React, { useState, useEffect, useContext } from 'react';

import { diaContext } from '../../context/Dia/diaContext';
import { OrdenarArregloObj } from '../../helpers';

// Componentes
import { Alimento } from './Alimento';

export const Alimentos = () => {

    // Context
    const DiaContext = useContext(diaContext);
    const { guardarAlimentosAPI } = DiaContext;

    // State
    const [data, guardarData] = useState([]);

    // Consulta a la API
    useEffect(() => {
        let request = new Request(process.env.REACT_APP_BACKEND_URL, {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            referrerPolicy: 'no-referrer'
        });
        fetch(request)
            .then(response => response.json())
            .then(dataJSON =>  {
                guardarData(dataJSON);
                guardarAlimentosAPI(dataJSON);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    // Extraemos solo los alimentos de la consulta a la API
    let { alimentos } = data;

    // Montamos o no el componente
    if (alimentos === undefined) return <h1 className="my-4 text-center bg-blue">CARGANDO ALIMENTOS, POR FAVOR ESPERE...</h1>;

    // Ordenamos el objeto por su atributo nombre
    let alimentosSort = OrdenarArregloObj(alimentos, 'nombre');

    return (
        <div>
            <h1 className="my-4 text-center bg-blue">LISTA DE ALIMENTOS</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4 screen-alimentos">
                {
                    alimentosSort.map(alimento => (
                        <Alimento
                            key={alimento._id}
                            alimento={alimento}
                        />
                    ))
                }
            </div>
        </div>
    );
};