import React, { Component } from "react";
import API from "../redux/ApiRedux";
import Calendario from "../components/calendario";
import TareaP from "../components/TareasPendientes";
import TareaR from "../components/TareasRealizadas";
import Perfil from "../components/Perfil";
import NavbarInicio from "../components/navbarInicio";

import "./home.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class home extends Component {
  state = {
    tareaPendiente: [],
    tareasRealizadas: [],
    conteTareas: 0,
  };

  componentDidMount() {
    API.get(`/tareaspendientes`)
      .then((res) => {
        const post = res.data;
        this.setState({
          tareaPendiente: post,
          conteTareas: post.length,
        });
      })
      .catch((err) => console.log(err));

    API.get(`/tareasrealizadas`)
      .then((res) => {
        const post1 = res.data;
        this.setState({
          tareasRealizadas: post1,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {
      user: { loading, authenticated },
    } = this.props;

    let tareasPE =
      Object.entries(this.state.tareaPendiente).length !== 0 ? (
        this.state.tareaPendiente.map((tarea) => (
          <TareaP key={tarea.tareaId} tarea={tarea}/>
        ))
      ) : (
        <p className="text-danger">Aun no hay tareas escritas...</p>
      );

    let tareasRE =
      Object.entries(this.state.tareasRealizadas).length !== 0 ? (
        this.state.tareasRealizadas.map((tarea) => (
          <TareaR key={tarea.tareaId} tarea={tarea} />
        ))
      ) : (
        <p className="text-danger">No hay tareas realizadas...</p>
      );

    const style = {
      width: "100%",
    };

    let titulo =
      window.screen.width >= 425 ? (
        <h1 className="text-white mb-0 lh-100 text-break">
          <i className="fas fa-book"></i> Tus Tareas/Actividades
        </h1>
      ) : (
        <h3 className="text-white mb-0 lh-100 text-break">
          Tus Tareas/Actividades
        </h3>
      );
      let perfil =
        window.screen.width >= 1024 ? (
          <div
            className={
              window.screen.width >= 1024 ? "col-md-4 espacio-top" : ""
            }
          >
            <div className="container">
              <Perfil conteo={this.state.conteTareas} />
            </div>
          </div>
        ) : (
          <div />
        );
    let sesion = !loading ? (
      authenticated ? (
        <header className="fondo-lavander">
          <NavbarInicio conteo={this.state.conteTareas} />
          <div className="container">
            <div className="pos-f-t text-dark espacio-top">
              <nav className="row navbar navbar-dark d-flex align-items-center p-3 my-3 text-dark-50 bg-primary rounded shadow-sm">
                  <div
                    className={
                      window.screen.width >= 1024
                        ? "col-md-8 text-center"
                        : "col-md-12 text-center"
                    }
                  >
                    {titulo}
                  </div>

                  <div
                    className={
                      window.screen.width >= 1024
                        ? "col-md-4 text-center"
                        : "col-md-12 text-center espacio-calendario"
                    }
                  >
                    <button
                      className="navbar-toggler text-center btn btn-secondary"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarToggleExternalContent"
                      aria-controls="navbarToggleExternalContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="text-white">Calendario</span>
                    </button>
                  </div>
              </nav>
              <div className="collapse" id="navbarToggleExternalContent">
                <Calendario />
              </div>
            </div>
            <div className="row">
              {perfil}
              <div
                className={
                  window.screen.width >= 1024 ? "col-md-8" : "col-md-12"
                }
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                      <h4 className="border-bottom border-gray pb-2 mb-0 espacio-tarea">
                        Tareas/Actividades Pendientes
                      </h4>
                      {tareasPE}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                      <h4 className="border-bottom border-gray pb-2 mb-0 espacio-tarea">
                        Tareas/Actividades Realizadas
                      </h4>
                      {tareasRE}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <div>{(window.location.href = "/")}</div>
      )
    ) : (
      <div className="container">
        <NavbarInicio />
        <div className="alert alert-danger espacio-top" role="alert">
          <p>Buscando tareas</p>
          {loading && (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped bg-danger progress-bar-animated"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style={style}
              ></div>
            </div>
          )}
        </div>
      </div>
    );

    return <div>{sesion}</div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

home.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(home);
