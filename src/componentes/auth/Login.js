import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alerta/alertaContext';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import authContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    const { alerta, mostrarAlerta } = useContext(alertaContext);
    const { autenticado, msg, iniciarSesion } = useContext(authContext);

    //Para redirigirlo a la pagina principal, si esta loguiado
    //o si existe el token
    useEffect(() => {
        if(autenticado){
            props.history.push('/');
        }

        if(msg != null) {
            mostrarAlerta({
                msj: msg,
                error: true
            })
        }
    }, [autenticado, msg])// eslint-disable-line react-hooks/exhaustive-deps

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const manejarCambios = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const validarUsuario = async e => {
        e.preventDefault();


        if( usuario.email.trim() === '' || usuario.password.trim() === ''){
            mostrarAlerta({
                msj: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        await iniciarSesion(usuario.email, usuario.password)

        if(msg != null) {
            mostrarAlerta({
                msj: msg,
                error: true
            })
        }
    }

    return ( 
        <Container fluid className='bg-azul'>
            <Row className='row vh-100 justify-content-center align-items-center'>
                <Col md={8} lg={5} xl={3} className='bg-light rounded'>
                    <Form.Group 
                        className='my-5 mx-2'
                        as="form"
                        onSubmit={validarUsuario}
                    >
                        <h3 className='text-center text-primary mb-4'>Iniciar sesion</h3>
                        { !alerta ? null : (<Alert variant={alerta.clase}>{alerta.mensaje}</Alert>)}
                        <Row className='form-group'>
                            <Col xs={3} as="label" htmlFor='email'>Email</Col>
                            <Col xs={9}>
                                <Form.Control 
                                    type='email' 
                                    className='form-control' 
                                    id='email' 
                                    name='email' 
                                    placeholder='Email' 
                                    onChange={manejarCambios}
                                    value={usuario.email}
                                />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col xs={3} as="label" htmlFor='password'>Password</Col>
                            <Col xs={9}>
                                <Form.Control 
                                    type='password' 
                                    className='form-control' 
                                    id='password' 
                                    name='password' 
                                    placeholder='Password' 
                                    onChange={manejarCambios}
                                    value={usuario.password}
                                />
                            </Col>    
                        </Row>
                        <Button 
                            type='submit' 
                            variant='primary'
                            className='my-3 w-100'
                        >Iniciar sesion</Button>
                        <Link to={'/registrarse'}>Registrarse</Link>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
}
 
export default Login;