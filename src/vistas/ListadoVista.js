import React, { Fragment, useEffect, useContext, useState } from 'react';
import Navbar from '../componentes/layout/Navbar';
import Footer from '../componentes/layout/Footer';
import Listado from '../componentes/operacion/Listado';
import Operacion from '../componentes/operacion/Operacion';
import operacionContext from '../context/operacion/operacionContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ActualizarOperacion from '../componentes/operacion/ActualizarOperacion';

const ListadoVista = () => {

    const {operaciones, categorias, obtenerOperaciones, obtenerCategorias} = useContext(operacionContext);

    //cargue las operaciones y las categorias cuando cargue el componente
    useEffect(() => {
        obtenerOperaciones();
        obtenerCategorias();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const buscarPorCategoria = e => {
        e.preventDefault();

        //si no eligio ninguna categoria, traer todas
        if( categoria === "" ){
            obtenerOperaciones();
            return
        }

        obtenerOperaciones(categoria);        
    }

    const [categoria, cambiarCategoria] = useState('');

    // State del modal ActualizarOperacion
    const [modal, mostrarModal] = useState(false);

    return ( 
        <Fragment>
            <Navbar />
            <Container as='main'>
                <Row>
                    <Col xs={12} className='text-center scrollUp'>
                        <h3 className='my-2 text-primary'>Operaciones</h3>
                        <p>Seleccione un proyecto para modificarlo o eliminarlo</p>
                        <div className='justify-content-center d-flex'>
                            <Operacion 
                                mostrarModal={mostrarModal}
                            />
                        </div>
                        <Form.Group 
                            className='form-inline justify-content-center my-2'
                        >
                            <Form.Label htmlFor='categoria' className='mr-2'>Filtrar por categoria: </Form.Label>
                            <Form.Control as="select"
                                id='categoria' 
                                name='categoria'
                                value={categoria}
                                onChange={e => cambiarCategoria(e.target.value)}
                            >
                                <option value=''>-- TODAS --</option>
                                {categorias.map( (categoria, index) => (
                                    <option value={categoria.nombre} key={index}>{categoria.nombre}</option>
                                ))}
                            </Form.Control>
                            <Button variant="primary" className='mt-2 ml-sm-2 mt-sm-0' onClick={buscarPorCategoria}>Filtrar</Button>
                        </Form.Group>
                        <Listado operaciones={operaciones}/>
                        <ActualizarOperacion
                            modal={modal}
                            mostrarModal={mostrarModal}
                        />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Fragment>
     );
}
 
export default ListadoVista;