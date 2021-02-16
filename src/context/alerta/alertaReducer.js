import { MOSTRARALERTA, OCULTARALERTA } from "../../types";

const alertaReducer = (state, action) => {
    switch(action.type) {
        case MOSTRARALERTA:
            return {
                ...state,
                alerta: action.payload
            }
        case OCULTARALERTA:
            return {
                ...state,
                alerta: null
            }
        default: 
            return state;
    }
}  

export default alertaReducer;