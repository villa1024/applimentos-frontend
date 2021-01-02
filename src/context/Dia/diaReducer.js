import {
    AGREGAR_COMIDA_DIA,
    VACIAR_COMIDAS_DIA,
    GUARDAR_ALIMENTOS_API,
    ELIMINAR_COMIDA_DIA,
    MODIFICAR_GRAMOS_CONSUMIDOS_DIA,
    BOTON_CALCULAR,
} from '../../types';

export const diaReducer = (state, action) => {
    switch (action.type) {
        case AGREGAR_COMIDA_DIA:
            return {
                ...state,
                comidasDia: [...state.comidasDia, action.payload]
            };
        case GUARDAR_ALIMENTOS_API:
            return {
                ...state,
                alimentos: action.payload
            };
        case ELIMINAR_COMIDA_DIA:
            return {
                ...state,
                comidasDia: state.comidasDia.filter(comida => comida.nombre !== action.payload)
            };
        case VACIAR_COMIDAS_DIA:
            return {
                ...state,
                comidasDia: []
            };
        case MODIFICAR_GRAMOS_CONSUMIDOS_DIA:
            return {
                ...state,
                comidasDia: state.comidasDia.map(comida => comida.nombre === action.payload.nombre ? action.payload : comida)
            };
        case BOTON_CALCULAR:
            return {
                ...state,
                botonCalcular: action.payload
            };
        default:
            return state;
    };
};