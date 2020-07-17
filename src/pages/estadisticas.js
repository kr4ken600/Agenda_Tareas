import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/es';

import NavbarInicio from "../components/navbarInicio";

class estadisticas extends Component {

  tareasPendientes = (tarea) => {
    let cantidad = 0;
    for (let i = 0; i < tarea.length; i++) {
      if (tarea[i].realizado === false) {
        cantidad++;
      }
    }
    return <p>{cantidad}</p>
  }
  materiasPendientes = (tarea) => {
    let materia = [];
    for (let i = 0; i < tarea.length; i++) {
      if (tarea[i].realizado === false) {
        materia.push(<p key={tarea[i].fechaEntrega}>{tarea[i].materia}</p>)
      }
    }
    return materia
  }
  tareaUrgente = (tarea) => {
    let fechaActual = new Date();
    fechaActual = fechaActual.toString().substr(0,15);
    let fechaA = "";
    let fechaB = new Date(fechaActual);
    let restante = 0;
    let materia = [];
    for (let i = 0; i < tarea.length; i++) {
      if (tarea[i].realizado === false) {
        fechaA = new Date(tarea[i].fechaEntrega);
        restante = fechaA - fechaB;
        if(restante <= 86400000){
          materia.push(<div key={tarea[i].fechaEntrega}>
            <h6>{tarea[i].materia}</h6>
            <p>{tarea[i].tarea}</p>
          </div>)
        }
      }
    }
    return materia
  }

  tareasRegistradas = (tarea) => {
    let cantidad = 0;
    for (let i = 0; i < tarea.length; i++) {
      if (tarea[i].realizado === true) {
        cantidad++;
      }
    }
    return <p>{cantidad}</p>
  }

  render() {
    dayjs.locale("es");
    dayjs.extend(relativeTime);
    const {
      user: {
        tareas, authenticated, credentials: {registrado}
      },
    } = this.props;

    const padding = {
      padding: "10px",
    }

    let estadisticasM = authenticated ? (
      <header>
        <NavbarInicio />
        <main role="main" className="container espacio-top">
          <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-primary rounded shadow-sm">
            <div className="lh-100">
              <h4 className="mb-0 text-white lh-100">
                <i className="fas fa-address-book icon-espacio"></i> Tus
                Estadisticas Desde Tu Registro (
                {dayjs(registrado).format("DD/MMM/YYYY")} -{" "}
                {dayjs(new Date()).format("DD/MMM/YYYY")})
              </h4>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-6 text-center bg-danger text-white rounded shadow-sm"
              style={padding}
            >
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <h4>
                      <i className="fas fa-bookmark"></i> TAREAS PENDIENTES
                    </h4>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-center">
                    <h5>
                      <i className="fas fa-book-medical"></i> Total de Tareas
                    </h5>
                    {this.tareasPendientes(tareas)}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-center">
                    <h5>
                      <i className="fas fa-book-open"></i> Materias Pendientes
                    </h5>
                    {this.materiasPendientes(tareas)}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-center">
                    <h5>
                      <i className="fas fa-exclamation-circle"></i> Tarea
                      Urgente
                    </h5>
                    {this.tareaUrgente(tareas)}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 text-center bg-success text-white rounded shadow-sm"
              style={padding}
            >
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <h4>
                      <i className="fas fa-trophy"></i> LOGROS
                    </h4>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-center">
                    <h5>
                      <i className="fas fa-book-medical"></i> Total de Tareas
                      Registradas
                    </h5>
                    <p>{tareas.length}</p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-center">
                    <h5>
                      <i className="fas fa-bookmark"></i> Total de Tareas
                      Realizadas
                    </h5>
                    {this.tareasRegistradas(tareas)}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-center">
                    <h5>
                      <i className="fas fa-book-open"></i> Materia Con Más
                      Tareas Realizadas
                    </h5>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-center">
                    <h5>
                      <i className="fas fa-star"></i> Puntos Obtenidos
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </header>
    ) : (
      <div>{(window.location.href = "/inicio")}</div>
    );

    return estadisticasM;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
estadisticas.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(estadisticas);
