import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

export const MiCuenta = () => {

    // LocalStorage
    let datosIniciales = JSON.parse(localStorage.getItem('datos'));
    if (!datosIniciales) {
        datosIniciales = {
            altura: '',
            peso: '',
            sexo: '',
            edad: '',
            caloriasTotales: 0
        };
    }

    // State
    const [datos, guardarDatos] = useState(datosIniciales);

    // Extraer valores del state
    const { altura, peso, sexo, edad, caloriasTotales } = datos;

    // useEffect para trabajar con localStorage
    useEffect(() => {
        localStorage.setItem('datos', JSON.stringify(datos));
    }, [datos]);

    // Inputs del formulario de micuenta
    const handleInputChange = (e) => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    // Calculo de las calorias diarias
    const calcularCaloriasMaximasDiarias = () => {
        let total = 0;
        if (altura === '' || peso === '' || sexo === '' || edad === '') {
            guardarDatos({
                ...datos,
                caloriasTotales: 0
            });
            return 0;
        }
        // Total para las mujeres
        if (sexo === 'Hombre') {
            total = (10 * peso) + (6.25 * altura) - (5 * edad) + (5);
        }
        // Total para las mujeres
        else if (sexo === 'Mujer') {
            total = (10 * peso) + (6.25 * altura) - (5 * edad) + (161);
        }
        guardarDatos({
            ...datos,
            caloriasTotales: total
        });
        // localStorage para calendario
        var array = [];
        localStorage.setItem('calendario', JSON.stringify(array));
        swal("Perfecto!", "Los datos han sido actualizados!", "success");
    };

    const borrarDatosMiCuenta = () => {
        swal("Seguro que desea eliminar los datos? Esta acción no puede revertirse...", {
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
                        localStorage.clear();
                        guardarDatos({
                            altura: '',
                            peso: '',
                            sexo: '',
                            edad: '',
                            caloriasTotales: 0
                        })
                        swal("Bien!", "Su Calendario ha sido borrado", "success");
                        break;
                    default:
                        swal("Cancelado!");
                }
            });
    };

    return (
        <>
            <h1 className="my-4 text-center bg-blue">MI CUENTA</h1>
            <form className="form-micuenta">
                <div className="mb-3">
                    <label className="form-label">Ingrese su sexo</label>
                    <select className="form-select" aria-label="Default select example" name="sexo" onChange={handleInputChange} value={sexo}>
                        <option defaultValue>Selecciones una opcion</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Ingrese su altura en centímetros</label>
                    <input
                        type="number"
                        className="form-control"
                        autoComplete="off"
                        id="exampleFormControlInput1"
                        name="altura"
                        value={altura}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Ingrese su peso en Kilogramos</label>
                    <input
                        type="number"
                        className="form-control"
                        autoComplete="off"
                        id="exampleFormControlInput2"
                        name="peso"
                        value={peso}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput3" className="form-label">Ingrese su edad</label>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="edad"
                        value={edad}
                        onChange={handleInputChange}
                    />
                </div>
                <h1 className="my-4 text-center">Calorias totales por día: {caloriasTotales.toFixed(0)}</h1>
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-primary fz-20"
                        onClick={calcularCaloriasMaximasDiarias}
                    >ACTUALIZAR DATOS</button>
                </div>
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-danger fz-20 mt-3"
                        onClick={borrarDatosMiCuenta}
                    >BORRAR DATOS</button>
                </div>
            </form>
        </>
    );
};