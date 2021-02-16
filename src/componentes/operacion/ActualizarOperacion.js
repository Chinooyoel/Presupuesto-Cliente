import React, { useContext, useState } from 'react';
import { Form, Modal, Button, Col } from 'react-bootstrap';
import alertaContext from '../../context/alerta/alertaContext';
import operacionContext from '../../context/operacion/operacionContext';
import PropTypes from 'prop-types'

const ActualizarOperacion = ({modal, mostrarModal}) => {

    const { operacionSeleccionada, modificarOperacion } = useContext(operacionContext);
    const { alerta, mostrarAlerta } = useContext(alertaContext);

    const [monto, actualizarMonto] = useState('');

    if( operacionSeleccionada === null ) return null;

    const actualizarOperacion = e => {
        e.preventDefault();

        //validamos que el monto no esta vacio
        if( monto.trim() === '' ) {
            mostrarAlerta({
                msj: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        modificarOperacion( operacionSeleccionada._id, monto );


        //cerramos el modal
        mostrarModal(false);
    }

    

    return ( 
        <Modal show={modal} onHide={ () => mostrarModal(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar monto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group
                    className='row'
                    id='formMonto'
                >
                    <Col xs={12}>
                        {alerta ? (<p className={`${alerta.clase} text-center`}>{alerta.mensaje}</p>) : null}
                    </Col>
                    <Col xs={6}>
                        <p className='text-right'>Fecha:</p>
                    </Col>
                    <Col xs={6}>
                        <p>{operacionSeleccionada.fecha}</p>
                    </Col>
                    <Col xs={6}>
                        <p className='text-right'>Concepto</p>
                    </Col>
                    <Col >
                        <p>{operacionSeleccionada.concepto}</p>
                    </Col>
                    <Col xs={6}>
                        <p className='text-right'>Categoria</p>
                    </Col>
                    <Col xs={6}>
                        <p>{operacionSeleccionada.categoria}</p>
                    </Col>
                    <Col xs={6}>
                        <p className='text-right'>Tipo</p>
                    </Col>
                    <Col xs={6}>
                        <p>{operacionSeleccionada.tipo}</p>
                    </Col>
                    <Col xs={6}>
                        <p className='text-right'>Monto:</p>
                    </Col>
                    <Col xs={3}>
                        <Form.Control
                            type='number'
                            onChange={e => actualizarMonto(e.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary" 
                    onClick={actualizarOperacion}
                >CONFIRMAR</Button>
                <Button 
                    variant="secondary" 
                    onClick={() => mostrarModal(false)}
                >CANCELAR</Button>
            </Modal.Footer>
        </Modal>
    );
}
 
ActualizarOperacion.propTypes = {
    modal: PropTypes.bool.isRequired,
    mostrarModal: PropTypes.func.isRequired
}

export default ActualizarOperacion;