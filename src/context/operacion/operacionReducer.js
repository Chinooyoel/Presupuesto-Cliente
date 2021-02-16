import { CREAROPERACION, ELIMINAROPERACION, MODIFICAROPERACION, OBTENER10OPERACIONES, OBTENERBALANCE, OBTENERCATEGORIAS, OBTENEROPERACIONES, SELECCIONAROPERACION } from "../../types";


const operacionReducer = (state, action) => {
    switch (action.type){
        case OBTENER10OPERACIONES:
            return {
                ...state,
                ultimasOperaciones: action.payload
            }
        case OBTENEROPERACIONES:
            return {
                ...state,
                operaciones: action.payload
            }
        case SELECCIONAROPERACION:
            return {
                ...state,
                operacionSeleccionada: action.payload
            }
        case ELIMINAROPERACION:
            return {
                ...state,
                operaciones: state.operaciones.filter(operacion => operacion._id !== action.payload._id),
                operacionSeleccionada: null,
            }
        case CREAROPERACION: 
            return{
                ...state,
                ultimasOperaciones: [action.payload, ...state.ultimasOperaciones],
                //Sumamos al balance si es un ingreso, caso contrario lo restamos
                balance: action.payload.tipo === 'INGRESO' ? state.balance += action.payload.monto : state.balance -= action.payload.monto
            }
        case MODIFICAROPERACION:
            return{
                ...state,
                operacionSeleccionada : action.payload,
                operaciones: state.operaciones.map(operacion => {
                    //actualizamos el monto de la operacion del state operaciones
                    if(operacion._id === action.payload._id){
                        operacion.monto = action.payload.monto
                    }
                    return operacion;
                }),
            }
        case OBTENERBALANCE:
            return {
                ...state,
                balance: action.payload
            }
        case OBTENERCATEGORIAS:
            return{
                ...state,
                categorias: action.payload
            }
        default:
            return state;
    }
}

export default operacionReducer;