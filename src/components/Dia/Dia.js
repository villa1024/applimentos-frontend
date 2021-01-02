import React, { useState, useContext } from 'react';
import swal from 'sweetalert';

import { diaContext } from '../../context/Dia/diaContext';

// Components
import { Item } from './Item';

export const Dia = () => {

    // Context para extraer las comidas agregas desde Alimentos y obtener caloriasMaximas desde Micuenta
    const nuevoDiaContext = useContext(diaContext);
    const { comidasDia, botonCalcular, estadoBotonCalcular, vaciarComidasDia } = nuevoDiaContext;

    // Extraer datos de Mi Cuenta desde localStorage
    let { caloriasTotales } = JSON.parse(localStorage.getItem('datos')) || '';

    // State para guardar los inputs y agregar todo a localStorage para Calendario
    const [form, guardarForm] = useState({
        fecha: '',
        caloriasMaximasAlDia: caloriasTotales,
        caloriasConsumidasDia: ''
    });
    const { fecha, caloriasMaximasAlDia, caloriasConsumidasDia } = form;

    // En caso de no haber aun comidas agregadas a Dia
    if (comidasDia.length === 0) return (
        <>
            <h1 className="my-4 text-center bg-blue">CREAR NUEVO DIA</h1>
            <p className="my-4 text-center fz-20">Agregue sus comidas desde el menú "Alimentos"</p>
        </>
    )

    // Ordenamos alfabeticamente el arreglo de comidas
    comidasDia.sort();

    // Inputs del formulario
    const handleInputChange = (e) => {
        guardarForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Formatea la fecha ingresada y calcula las calorias totales consumidas
    const calcularDatosIntroducidos = () => {
        // Comprobamos que ningun input este en 0
        for (let i = 0; i < comidasDia.length; i++) {
            if (comidasDia[i].gramosConsumidos === 0 || comidasDia[i].gramosConsumidos === '') {
                guardarForm({
                    ...form,
                    caloriasConsumidasDia: 0
                });
                document.getElementById('total').innerHTML = '0';
                swal("Cuidado!", "Uno de los alimentos contiene 0 gramos consumidos", "warning");
                return 0;
            }
        }
        // Calculamos
        const arrayCaloriasPorcion = comidasDia.map(comida => comida.gramosConsumidos / comida.porcion * comida.caloriasPorcion);
        const caloriasConsumidas = arrayCaloriasPorcion.reduce((a, b) => a + b).toFixed(1);
        if (isNaN(caloriasConsumidas)) { // no es numero
            document.getElementById('total').innerHTML = '0';
            swal("Cuidado!", "Uno de los alimentos contiene 0 gramos consumidos", "warning");
            return 0;
        }
        else { // es un numero
            document.getElementById('total').innerHTML = caloriasConsumidas;
            // Guardamos
            guardarForm({
                ...form,
                caloriasConsumidasDia: caloriasConsumidas,
            });
            estadoBotonCalcular(true);
        }
    };

    // Guardar en calendario lo comido en el dia
    const guardarDiaCalendario = (e) => {
        e.preventDefault();
        if (caloriasMaximasAlDia === '' || caloriasMaximasAlDia === undefined || caloriasMaximasAlDia === 0) {
            swal("Error!", 'Vaya al menú "Mi Cuenta" he ingrese lo solicitado', "error");
            return 0;
        }
        else if (fecha === '') {
            swal("Cuidado!", "Agregue una fecha antes de continuar", "warning");
            return 0;
        }
        else if (caloriasConsumidasDia === '') {
            swal("Cuidado!", "Antes de guardar, presione el boton CALCULAR", "warning");
            return 0;
        }
        else if (!botonCalcular) {
            swal("Cuidado!", "Antes de guardar, calcule otra vez presionando el boton CALCULAR", "warning");
            return 0;
        }
        // Obtener el arreglo de localStorage
        let arrayCalendario = JSON.parse(localStorage.getItem('calendario'));
        // Comprobamos que la fecha no exista en Calendario
        if (!arrayCalendario.find(obj => obj.fecha === fecha)) {
            arrayCalendario.push(form)
            localStorage.setItem('calendario', JSON.stringify(arrayCalendario));
            // Vaciamos fecha y comidasDia
            vaciarComidasDia();
            // Notificacion
            swal("Perfecto!", 'Los datos han sido guardardos en el menú "Calendario"', "success");
        }
        else {
            swal("Cuidado!", 'Este día ya existe en su "Calendario"', "warning");
        }
    };

    return (
        <>
            <h1 className="my-4 text-center bg-blue">CREAR NUEVO DIA</h1>
            <div className="screen-dia">
                <form className="form-dia" onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3 form-date">
                        <label className="form-label fz-30">FECHA</label>
                        <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="fecha" onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <p className="form-label text-center fz-30 mb-4">COMIDAS AGREGADAS: (Agreguelas desde el menú "Alimentos")</p>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {
                                comidasDia.map(comida => (
                                    <Item
                                        key={comida._id}
                                        comida={comida}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <p className="my-4 text-center fz-30">TOTAL DE CALORÍAS CONSUMIDAS</p>
                    <p className="text-center fz-30" id="total"></p>
                    <div className="card-body">
                        <div className="d-grid gap-2 mb-2">
                            <button
                                type="button"
                                className="btn btn-primary fz-20"
                                onClick={calcularDatosIntroducidos}
                            >CALCULAR</button>
                        </div>
                    </div>
                    <hr />
                    <div className="d-grid gap-2">
                        <button
                            type="button"
                            className="btn btn-success fz-20"
                            onClick={guardarDiaCalendario}
                        >GUARDAR</button>
                    </div>
                </form>
            </div>
        </>
    );
};