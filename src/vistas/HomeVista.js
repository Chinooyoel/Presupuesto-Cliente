import React, { Fragment, useEffect, useContext, useState } from 'react';
import Navbar from '../componentes/layout/Navbar';
import Listado from '../componentes/operacion/Listado';
import NuevaOperacion from '../componentes/operacion/NuevaOperacion';
import Footer from '../componentes/layout/Footer';
import operacionContext from '../context/operacion/operacionContext';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomeVista = () => {

    const { ultimasOperaciones, balance, obtenerUltimasOperaciones, obtenerBalance } = useContext(operacionContext)

    //para que cargue el balance y las ultimas 10 operaciones cuando se renderize el componente
    useEffect(() => { 
        obtenerUltimasOperaciones();  
        obtenerBalance();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    // State del modal NuevaOperacion
    const [modal, mostrarModal] = useState(false);

    return ( 
        <Fragment>
            <Navbar/>
            <NuevaOperacion 
                modal={modal}
                mostrarModal={mostrarModal}
            />
            <Container as='main' className='py-3 scrollUp'>
                <Row>
                    <Col xs={12} className='text-center mb-2'>
                        <div className='justify-content-end d-flex mb-3'>
                            <Button variant="success" onClick={() => mostrarModal(true)}>Agregar Operacion</Button>
                        </div>
                        <h3 className='text-primary'>Balance Actual</h3>
                        <p className='display-4 animate__animated animate__tada'>${balance}.00</p>
                    </Col>
                    <Col xs={12}>
                        <Listado operaciones={ultimasOperaciones}/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Fragment>
     );
}
 
export default HomeVista;