import React, { useReducer } from 'react';

import { diaContext } from './diaContext';
import { diaReducer } from './diaReducer';
import {
    AGREGAR_COMIDA_DIA,
    VACIAR_COMIDAS_DIA,
    GUARDAR_ALIMENTOS_API,
    ELIMINAR_COMIDA_DIA,
    MODIFICAR_GRAMOS_CONSUMIDOS_DIA,
    BOTON_CALCULAR
} from '../../types';

export const DiaState = props => {
    const initialState = {
        alimentos: [],
        comidasDia: [],
        botonCalcular: false
    };

    const [state, dispatch] = useReducer(diaReducer, initialState);

    // Recibe lista de alimentos de la API
    const guardarAlimentosAPI = (data) => {
        dispatch({
            type: GUARDAR_ALIMENTOS_API,
            payload: data
        });
    };

    // Agrega una camida a un nuevo dia
    const agregarComidaDia = (comida) => {
        dispatch({
            type: AGREGAR_COMIDA_DIA,
            payload: comida
        });
    };

    // Eliminar una comida de comidasDia
    const eliminarComidaDia = (nombre) => {
        dispatch({
            type: ELIMINAR_COMIDA_DIA,
            payload: nombre
        });
    };

    // Vaciamos el arreglo comidasDia
    const vaciarComidasDia = () => {
        dispatch({
            type: VACIAR_COMIDAS_DIA
        });
    };

    // Modificar porciones consuidas en comidasDia
    const modificarGramosConsumidosDia = (comida) => {
        dispatch({
            type: MODIFICAR_GRAMOS_CONSUMIDOS_DIA,
            payload: comida
        });
    };

    // Cambiar estado del boton calcular en Dia
    const estadoBotonCalcular = (estado) => {
        dispatch({
            type: BOTON_CALCULAR,
            payload: estado
        });
    };

    return (
        <diaContext.Provider
            value={{
                alimentos: state.alimentos,
                comidasDia: state.comidasDia,
                botonCalcular: state.botonCalcular,

                agregarComidaDia,
                guardarAlimentosAPI,
                eliminarComidaDia,
                modificarGramosConsumidosDia,
                estadoBotonCalcular,
                vaciarComidasDia
            }}
        >
            {props.children}
        </diaContext.Provider>
    )
};