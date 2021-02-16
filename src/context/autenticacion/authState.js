import { useReducer } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';
import clienteAxios from '../../config/axios';
import { CERRAR_SESION, INICIAR_SESION, LOGUEO_ERROR, REGISTRO_ERROR } from '../../types';
import tokenAuth from '../../config/token';

const AuthState = props => {

    const stateInicial = ({
        token: localStorage.getItem('token'),
        autenticado: false,
        msg: null
    });

    const [state, dispatch] = useReducer(authReducer, stateInicial);

    const iniciarSesion = async ( email, password ) => {
        try {
            const respuesta = await clienteAxios.post('/auth', { email, password });
            const token = respuesta.data.token;

            //llamamos a la funcion tokenAuth para que agregue 
            //el token en el header de las peticiones
            tokenAuth(token);

            dispatch({
                type: INICIAR_SESION,
                payload: token
            })

        } catch (error) {
            dispatch({
                type: LOGUEO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            return;
        }

        tokenAuth(token);

        try {
            await clienteAxios.get('/auth');

            dispatch({
                type: INICIAR_SESION,
                payload: token
            })
        } catch (error) {
            console.log(error)
        }
    }

    const registrarUsuario = async usuario => {
        try {
            await clienteAxios.post('/usuarios', usuario);

            iniciarSesion(usuario.email, usuario.password)
            
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }   
    }

    return (
        <AuthContext.Provider
            value={{
                autenticado: state.autenticado,
                token: state.token,
                msg: state.msg,
                iniciarSesion,
                cerrarSesion,
                registrarUsuario,
                usuarioAutenticado
            }}
        >{props.children}</AuthContext.Provider>
    )
}

export default AuthState;