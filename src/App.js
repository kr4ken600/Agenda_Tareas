import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';


//Styls
//import './App.css';
//Componentes
import AuthRoute from './util/AuthRoute';

//Paginas
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import RegistrarTarea from './pages/registrarTarea';
import muestra from "./pages/muestra";


class App extends Component{
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={muestra}></Route>
          <Route exact path="/inicio" component={home} />
          <AuthRoute exact path="/login" component={login} />
          <AuthRoute exact path="/signup" component={signup} />
          <Route exact path="/tarea" component={RegistrarTarea} />
        </Switch>
      </div>
    );
  }
}

export default App;
