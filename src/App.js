import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './componentes/auth/Login';
import NuevaCuenta from './componentes/auth/NuevaCuenta';
import HomeVista from './vistas/HomeVista';
import ListadoVista from './vistas/ListadoVista';
import AlertaState from './context/alerta/alertaState';
import OperacionState from './context/operacion/operacionState';
import RutaPrivada from './rutas/RutaPrivada';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';

function App() {

  const token = localStorage.getItem('token');
  //para que mantenga la sesion iniciada si existe el token
  if(token){
    tokenAuth(token)
  }

  return (
      <OperacionState>
        <AlertaState>
          <AuthState>
            <BrowserRouter>
              <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/registrarse' component={NuevaCuenta}/>
                <RutaPrivada exact path='/' component={HomeVista}/>
                <RutaPrivada exact path='/listado' component={ListadoVista}/>
              </Switch>
            </BrowserRouter>
          </AuthState>
        </AlertaState>
      </OperacionState>
  );
}

export default App;
