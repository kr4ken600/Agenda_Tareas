import React, { Component } from "react";
import Perfil from "./PerfilNav";

class navbarInicio extends Component {
  state = {
    accion: false,
  };

  handleClick = () => {
    this.setState({
      accion: !this.state.accion,
    });
  };

  pantalla = () => {
    var width = "";
    if (window.screen.width < 575) {
      width = "75%";
    } else if (window.screen.width <= 768 && window.screen.width >= 575) {
      width = "48%";
    } 
    return width;
  };

  render() {
    let resolucion = this.pantalla();
    const style = {
      width: resolucion,
    };
    let mostrarBotones = this.state.accion ? (
      <div
        className={
          this.state.accion
            ? "navbar-collapse offcanvas-collapse open"
            : "navbar-collapse offcanvas-collapse"
        }
        id="navbarsExampleDefault"
      >
        <div style={style}>
          <Perfil conteo={this.props.conteo} cerrar={this.handleClick} />
        </div>
      </div>
    ) : (
      <div></div>
    );
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <a className="navbar-brand mr-auto mr-lg-0" href="/inicio">
          Recuerda Tareas
        </a>
        <button
          className="navbar-toggler p-0 border-0"
          type="button"
          data-toggle="offcanvas"
          onClick={this.handleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {mostrarBotones}
      </nav>
    );
  }
}

export default navbarInicio;
