import React, { useState } from 'react';
import swal from 'sweetalert';

import { OrdenarArregloObj } from '../../helpers';
// Components
import { Item } from './Item';

export const Calendario = () => {

    // localStorage
    let calendarioInicial = JSON.parse(localStorage.getItem('calendario')) || [];

    // Ordenamos el objeto por su atributo nombre
    let calendarioSort = OrdenarArregloObj(calendarioInicial, 'fecha');

    // State para calendario
    const [calendario, guardarCalendario] = useState(calendarioSort);

    // Condicional
    if (calendarioInicial === null) return <h1 className="my-4 text-center bg-blue">CALENDARIO</h1>;

    // Eliminar un dia del calendario
    const eliminarDiaCalendario = (dia) => {
        swal("Seguro que desea eliminar este día? Esta acción no puede revertirse...", {
            buttons: {
                cancel: "Cancelar",
                aceptar: {
                    text: "Borrar",
                    value: "borrar",
                },
            },
        })
            .then((value) => {
                switch (value) {
                    case "borrar":
                        let arrayCalendario = JSON.parse(localStorage.getItem('calendario'));
                        let calendarioFiltrado = arrayCalendario.filter(obj => obj.fecha !== dia.fecha);
                        guardarCalendario(calendarioFiltrado);
                        localStorage.setItem('calendario', JSON.stringify(calendarioFiltrado));
                        swal("Bien!", "El dia ha sido borrado", "success");
                        break;
                    default:
                        swal("Cancelado!");
                }
            });
    };

    // Elimina todo el calendario de localStorage. Esta accion no puede revertirse
    const eliminarCalendario = (e) => {
        e.preventDefault();
        // Swal
        swal("Seguro que desea eliminar el Calendario completamente? Esta acción no puede revertirse...", {
            buttons: {
                cancel: "Cancelar",
                aceptar: {
                    text: "Borrar",
                    value: "borrar",
                },
            },
        })
            .then((value) => {
                switch (value) {
                    case "borrar":
                        // localStorage para calendario
                        var array = [];
                        localStorage.setItem('calendario', JSON.stringify(array));
                        guardarCalendario([]);
                        swal("Bien!", "Su Calendario ha sido borrado", "success");
                        break;
                    default:
                        swal("Cancelado!");
                }
            });
    };

    return (
        <>
            <h1 className="my-4 text-center bg-blue">CALENDARIO</h1>
            <div className="d-grid gap-2">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={eliminarCalendario}
                >ELIMINAR CALENDARIO</button>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 screen-alimentos">
                {
                    (calendarioInicial !== null)
                        ?
                        calendario.map(dia => (
                            <Item
                                key={dia.fecha}
                                dia={dia}
                                eliminarDiaCalendario={eliminarDiaCalendario}
                            />
                        ))
                        : null
                }
            </div>
        </>
    );
};