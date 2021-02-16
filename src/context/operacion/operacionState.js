import React, { useReducer } from 'react';
import { CREAROPERACION, ELIMINAROPERACION, OBTENER10OPERACIONES, OBTENERBALANCE, OBTENEROPERACIONES, SELECCIONAROPERACION, OBTENERCATEGORIAS, MODIFICAROPERACION } from '../../types';
import OperacionContext from './operacionContext';
import operacionReducer from './operacionReducer';
import clienteAxios from '../../config/axios';
import { darFormatoFecha } from '../../helpers';

const OperacionState = props => {

    const initialState = ({
        ultimasOperaciones: [],
        operaciones: [],
        operacionSeleccionada: null,
        balance: 0,
        categorias: []
    });

    const [state, dispatch] = useReducer(operacionReducer, initialState);

    //obtener las 10 ultimas funciones registradas
    const obtenerUltimasOperaciones = async () => {
        //mandamos una solicitud GET
        try {
            const cantidadOperaciones = 10;
            const respuesta = await clienteAxios.get(`/operaciones/obtener/${cantidadOperaciones}`);
            const operaciones = respuesta.data.operaciones;

            //le damos formato a la fecha dd-mm-yyyy
            operaciones.forEach(operacion => {
                operacion.fecha = darFormatoFecha(operacion.fecha);
            });


            dispatch({
                type: OBTENER10OPERACIONES,
                payload: operaciones
            })
        } catch (error) {
            console.log(error)
        }

    }

    //obtener operaciones por categoria
    const obtenerOperaciones = async categoria => {
        //mandamos una solicitud GET
        try {
            const cantidadOperaciones = 20;

            let respuesta;

            if(categoria === '' || !categoria) {
                respuesta = await clienteAxios.get(`/operaciones/obtener/${cantidadOperaciones}`);
            }else{
                respuesta = await clienteAxios.get(`/operaciones/obtener/${cantidadOperaciones}?categoria=${categoria}`);
            }

            const operaciones = respuesta.data.operaciones;

            operaciones.forEach(operacion => {
                operacion.fecha = darFormatoFecha(operacion.fecha);
            });

            dispatch({
                type: OBTENEROPERACIONES,
                payload: operaciones
            })

        } catch (error) {
            console.log(error)
        }

    }

    //seleccionar una operacion para que se pueda modificar o eliminar
    const seleccionarOperacion = operacion => {
        dispatch({
            type: SELECCIONAROPERACION,
            payload: operacion
        })
    }


    //eliminar una operacion
    const eliminarOperacion = async operacion => {

        try {
            const respuesta = await clienteAxios.delete(`/operaciones/${operacion._id}`);
            console.log(respuesta.data.msg);

            dispatch({
                type: ELIMINAROPERACION,
                payload: operacion
            })

        } catch (error) {
            console.log(error)
        }
    }

    //obtener el balance de las operaciones
    const obtenerBalance = async () => {
        try {
            const respuesta = await clienteAxios.get('/operaciones/balance');

            dispatch({
                type: OBTENERBALANCE,
                payload: respuesta.data.balance
            })

        }catch( error ) {
            console.log(error)
        }

    }

    //crear operacion
    const crearOperacion = async operacion => {
        try {
            const respuesta = await clienteAxios.post(`/operaciones/crear`, operacion);

            //le damos formato a la fecha dd-mm-yyyy
            respuesta.data.operacion.fecha = darFormatoFecha(respuesta.data.operacion.fecha);

            dispatch({
                type: CREAROPERACION,
                payload: respuesta.data.operacion
            })
        } catch (error) {
            console.log(error)
        }
    }


    //obtener todas las categorias 
    const obtenerCategorias = async () => {
        try {
            const respuesta = await clienteAxios.get(`/categorias`);

            dispatch({
                type: OBTENERCATEGORIAS,
                payload: respuesta.data.categorias
            })
        } catch (error) {
            console.log(error)
        }
    }

    //modificar monto de la operacion
    const modificarOperacion = async (idOperacion, monto) => {
        try {
            const respuesta = await clienteAxios.put(`/operaciones/${idOperacion}`, {monto});
            
            dispatch({
                type: MODIFICAROPERACION,
                payload: respuesta.data.operacion
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <OperacionContext.Provider
            value={{
                ultimasOperaciones: state.ultimasOperaciones,
                operaciones: state.operaciones,
                operacionSeleccionada: state.operacionSeleccionada,
                balance: state.balance,
                categorias: state.categorias,
                obtenerUltimasOperaciones,
                obtenerOperaciones,
                seleccionarOperacion,
                eliminarOperacion,
                obtenerBalance,
                crearOperacion,
                obtenerCategorias,
                modificarOperacion
            }}
        >
            {props.children}
        </OperacionContext.Provider>
    )
}


export default OperacionState;