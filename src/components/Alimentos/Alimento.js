import React, { useContext, useEffect } from 'react';

import { diaContext } from '../../context/Dia/diaContext';
import swal from 'sweetalert';

import '../../index.css';

export const Alimento = ({ alimento }) => {

    // Context
    const nuevoDiaContext = useContext(diaContext);
    const { comidasDia, agregarComidaDia } = nuevoDiaContext;

    // Extraemos solos los nombres de la lista de comidas
    const nombres = comidasDia.map((comida) => comida.nombre);

    // Agregamos una comida a comidasDia (context)
    const AgregarComida = (e) => {
        let boton = document.getElementById(alimento._id);
        if (!nombres.includes(alimento.nombre)) {
            alimento.gramosConsumidos = '';
            boton.innerHTML = 'AGREGADO CORRECTAMENTE';
            agregarComidaDia(alimento);
            swal("Perfecto!", 'El alimento ha sido agregado, reviselo en el menú "Día"!', "success");
        }
        else {
            if (!boton.classList.contains('disabled')) {
                boton.innerHTML = 'YA ESTÁ AGREGADO';
                boton.classList.add('disabled');
                swal("Error!", "Esta comida ya existe en su Dia", "error");
            }
        }
    };

    // Comprobar el color del boton agregar
    useEffect(() => {
        let boton = document.getElementById(alimento._id);
        if (nombres.includes(alimento.nombre)) {
            boton.innerHTML = 'YA ESTÁ AGREGADO';
            boton.classList.add('btn', 'btn-success');
        }
        else {
            boton.classList.add('btn', 'btn-primary');
        }
    });

    return (
        <div>
            <div className="col">
                <div className="card border-primary shadow-lg bg-white rounded">
                    <div className="card-body">
                        <h5 className="card-title text-center text-uppercase">{alimento.nombre}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Gramos de una porción: {alimento.porcion}</li>
                        <li className="list-group-item">Calorias por porción: {alimento.caloriasPorcion}</li>
                    </ul>
                    <div className="card-body">
                        <div className="d-grid gap-2">
                            <button
                                id={alimento._id}
                                type="button"
                                value={alimento.nombre}
                                onClick={AgregarComida}
                            >AGREGAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};