import React, {useState, useContext, useEffect} from 'react';
import { Form, Modal, Row, Button, Col } from 'react-bootstrap';
import alertaContext from '../../context/alerta/alertaContext';
import operacionContext from '../../context/operacion/operacionContext';
import PropTypes from 'prop-types';

const NuevaOperacion = ({modal, mostrarModal}) => {

  const formatoFecha = new Date().toISOString().split('T')[0];;

  const [operacion, setOperacion] = useState({
    concepto: '',
    categoria: '',
    fecha: formatoFecha,
    tipo: '',
    monto: ''
  });

  const {alerta, mostrarAlerta} = useContext(alertaContext);
  const { categorias, crearOperacion, obtenerCategorias} = useContext(operacionContext);

  //para que carguen las categorias cuando cargue el componente
  useEffect(() => {
    obtenerCategorias();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const manejarCambios = e => {
      setOperacion({
          ...operacion,
          [e.target.name]: e.target.value
      })
  }


  const validarOperacion = e => {
    e.preventDefault();

    if( operacion.concepto.trim() === '' || operacion.categoria.trim() === '' || operacion.fecha.trim() === '' || operacion.tipo.trim() === '' || operacion.monto.trim() === ''){
      mostrarAlerta({
        msj: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    crearOperacion(operacion);

    setOperacion({
      concepto: '',
      categoria: '',
      fecha: formatoFecha,
      tipo: '',
      monto: ''
    })

    //ocultamos el modal
    mostrarModal(false);
}

    return ( 
            <Modal show={modal} onHide={ () => mostrarModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Nueva operacion</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                {alerta ? (<p className={alerta.clase}>{alerta.mensaje}</p>) : null}

                <Form.Group id='formOperacion'>
                  <div className="form-group">
                    <label htmlFor="concepto" className="col-form-label" >Concepto</label>
                    <Form.Control
                      type="text" 
                      id="concepto" 
                      name='concepto' 
                      placeholder='Concepto' 
                      onChange={manejarCambios} 
                      value={operacion.concepto}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoria" className="col-form-label">Categoria</label>
                    <Form.Control as="select"
                      name='categoria' 
                      id='categoria'
                      value={operacion.categoria} 
                      onChange={manejarCambios} 
                      required
                    >
                      <option value=''>-- Seleccione la categoria --</option>
                      {categorias.map( (categoria, index) => (
                        <option value={categoria.nombre} key={index}>{categoria.nombre}</option>
                      ))}
                    </Form.Control>
                  </div>
                  <Row className="form-group">
                    <Col xs={12} md={6}>
                        <label htmlFor="fecha" className="col-form-label">Fecha</label>
                        <Form.Control
                          type='date' 
                          id='fecha' 
                          name='fecha' 
                          onChange={manejarCambios} 
                          value={operacion.fecha}
                          required
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <label htmlFor="monto" className="col-form-label">Monto</label>
                        <Form.Control
                          type='number' 
                          name='monto' 
                          id="monto" 
                          value={operacion.monto}
                          onChange={manejarCambios} 
                          required
                        />
                    </Col>
                  </Row>
                  <div className='d-flex justify-content-center'>
                    <div className="form-check form-check-inline">
                        <Form.Check
                          type='radio' 
                          name='tipo' 
                          id='ingreso' 
                          value='INGRESO' 
                          onChange={manejarCambios} 
                          required
                        />
                        <label htmlFor="ingreso" className="form-check-label">Ingreso</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <Form.Check
                          type='radio' 
                          name='tipo' 
                          id='egreso' 
                          value='EGRESO'
                          onChange={manejarCambios} 
                          required
                        />
                        <label htmlFor="egreso" className="form-check-label">Engreso</label>
                    </div>
                  </div>

                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button 
                  variant="primary"
                  type="submit" 
                  form='formOperacion' 
                  onClick={validarOperacion}
                >Crear</Button>
                <Button 
                  variant="secondary"
                  onClick={ () => mostrarModal(false)}
                >Cancelar</Button>
              </Modal.Footer>
            </Modal>
     );
}
 
NuevaOperacion.propTypes = {
  modal: PropTypes.bool.isRequired,
  mostrarModal: PropTypes.func.isRequired
}

export default NuevaOperacion;