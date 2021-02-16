import React, { useContext } from 'react';
import operacionContext from '../../context/operacion/operacionContext';
import { Table } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'

const Listado = ({operaciones}) => {

    const {seleccionarOperacion} = useContext(operacionContext);

    
    let history = useHistory();

    if( operaciones.length === 0 ) {
        return <p className='text-center'>-- No hay operaciones registradas --</p>
    }

    const elegirOperacion = operacion => {
        //cambiamos el state
        seleccionarOperacion(operacion)

        //Para cuando estemos en la pagina principal y queremos ver el detalle de la operacion
        //nos redireccione a /listado
        if(history.location.pathname !== '/listado'){
            history.push('/listado')
        }

        //scroliamos para arriba de la pagina
        const scrollUp = document.querySelector('.scrollUp');
        scrollUp.scrollIntoView({ behavior: 'smooth' })
    }

    return ( 
                <Table hover="true" className='w-100 text-center'>
                    <thead>
                        <tr className='bg-dark text-white'>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th className='d-none d-md-table-cell'>Categoria</th>
                            <th className='d-none d-md-table-cell'>Tipo</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TransitionGroup
                            component={null}
                        >
                            {operaciones.map( operacion => (
                                <CSSTransition
                                    key={operacion._id}
                                    timeout={500}
                                    classNames="animacion"
                                >
                                    <tr 
                                        className={`${ operacion.tipo === 'INGRESO' ? "table-success" : "table-danger" } pointer`} 
                                        onClick={() => elegirOperacion(operacion)}
                                        key={operacion._id}
                                    >
                                        <td>{operacion.fecha}</td>
                                        <td>{operacion.concepto}</td>
                                        <td className='d-none d-md-table-cell'>{operacion.categoria}</td>
                                        <td className='d-none d-md-table-cell'>{operacion.tipo}</td>
                                        <td>${operacion.monto}.00</td>
                                    </tr>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </tbody>
                </Table>
                
    );
}

Listado.propTypes = {
    operaciones: PropTypes.array
}
 
export default Listado;