import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import operacionContext from '../../context/operacion/operacionContext';
import PropTypes from 'prop-types'

const Operacion = ({mostrarModal}) => {

    const {operacionSeleccionada, eliminarOperacion} = useContext(operacionContext);

    //si no existe la fecha, no hay ninguna tarea seleccionada
    if( !operacionSeleccionada ) return null;

    const { fecha, concepto, categoria, tipo, monto} = operacionSeleccionada;

    return ( 
        <div className={`${ operacionSeleccionada.tipo === 'INGRESO' ? "table-success" : "table-danger" } rounded p-3`}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='text-left'>
                    <p className='mb-0'>{fecha}</p>
                    <h3 className='mb-0 h3'>{concepto}</h3>
                    <p className='mb-0'>{categoria}</p>
                    
                </div>
                <div className='text-center'>
                    <p className='mb-0'>{tipo}</p>
                    <p className='mb-0 h3'>${monto}</p>
                </div>
            </div>
            <div className='text-right my-2'>
                <Button
                    variant="primary"
                    className='mr-2'
                    onClick={() => mostrarModal(true)}
                >MODIFICAR MONTO</Button>
                <Button 
                    variant='danger'
                    onClick={() => eliminarOperacion(operacionSeleccionada)}
                >ELIMINAR</Button>
            </div>
        </div>
    );
}

Operacion.propTypes = {
    mostrarModal: PropTypes.func.isRequired
}
 
export default Operacion;