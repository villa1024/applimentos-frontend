import React, { useState, useContext, useEffect } from 'react';

import { diaContext } from '../../context/Dia/diaContext';

export const Item = ({ comida }) => {

    // Context
    const nuevoDiaContext = useContext(diaContext);
    const { eliminarComidaDia, modificarGramosConsumidosDia, estadoBotonCalcular } = nuevoDiaContext;

    // State
    const [alimento, guardarAlimento] = useState({
        ...comida,
        gramosConsumidos: ''
    });
    const { gramosConsumidos } = alimento || '';

    useEffect(() => {
        modificarGramosConsumidosDia(alimento);
        estadoBotonCalcular(false);
    }, [alimento]);

    // Modificar el state
    const handleChange = e => {
        guardarAlimento({
            ...alimento,
            [e.target.name]: e.target.value
        });
    };

    // Eliminar una comida de comidasDia
    const eliminarComida = (e) => {
        e.preventDefault();
        eliminarComidaDia(comida.nombre);
    };

    return (
        <div className="col">
            <div className="card border-primary shadow-lg bg-white rounded">
                <div className="card-body">
                    <h5 className="card-title text-center text-uppercase">{comida.nombre}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center">Gramos consumidos:
                            <input
                            type="text"
                            autoComplete="off"
                            className="text-center"
                            placeholder="Ingrese número"
                            name="gramosConsumidos"
                            value={gramosConsumidos}
                            onChange={handleChange}
                        />
                    </li>
                    <li className="list-group-item">Gramos por porcion: {comida.porcion}</li>
                    <li className="list-group-item">Calorias por porción: {comida.caloriasPorcion}</li>
                </ul>
                <div className="card-body">
                    <div className="d-grid gap-2">
                        <button
                            id={comida._id}
                            type="button"
                            className="btn btn-danger"
                            onClick={eliminarComida}
                        >ELIMINAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};