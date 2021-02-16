import { useReducer } from "react"
import { MOSTRARALERTA, OCULTARALERTA } from "../../types";
import AlertaContext from "./alertaContext";
import alertaReducer from "./alertaReducer"



const AlertaState = props => {
    const stateInicial = ({
        alerta: null
    })


    const [state, dispatch] = useReducer(alertaReducer, stateInicial);

    //mostrarAlerta
    const mostrarAlerta = mensaje => {
        let alerta;

        if( mensaje.error ){
            alerta = {
                mensaje: mensaje.msj,
                clase: 'alert alert-danger'
            }
        }else{
            alerta = {
                mensaje: mensaje.msj,
                clase: 'alert alert-success'
            }
        }

        dispatch({
            type: MOSTRARALERTA,
            payload: alerta
        })

        //ocultamos la alerta despues de 5seg
        setTimeout(() => {
            dispatch({
                type: OCULTARALERTA
            })
        }, 5000)
    }


    return (
        <AlertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >{props.children}</AlertaContext.Provider>
    )
    
}


export default AlertaState;