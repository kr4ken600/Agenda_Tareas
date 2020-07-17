import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registrarTareas, clearErrors } from "../redux/actions/dataActions";
import NavbarInicio from "../components/navbarInicio";
var CryptoJS = require("crypto-js");

class RegistrarTarea extends Component {
  state = {
    accion: false,
    errores: {},
    tarea: "",
    materia: "",
    mes: new Date().getMonth(),
    dia: new Date().getDate(),
    year: new Date().getFullYear(),
    horas: "false",
    minutos: "false",
    horario: "am",
    habilitarYear: false,
    etiqueta: "#fff"
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errores: nextProps.UI.errors,
        accion: false,
      });
    }
    if (
      !nextProps.UI.errors &&
      !nextProps.UI.loading &&
      nextProps.data.loading
    ) {
      this.setState({
        tarea: "",
        materia: "",
        mes: "",
        dia: "",
        horas: "false",
        minutos: "false",
        horario: "am",
        errores: {},
        accion: true,
      });
      setTimeout(() => {
        this.setState({
          accion: false,
        });
        window.location.reload(true);
      }, 2000);
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const year = this.state.year;
    const mes = this.state.mes;
    const dia = this.state.dia;
    const fechaEntrega = new Date(year, mes, dia);
    let fechaOrden = fechaEntrega.toISOString();
    let fechaConvertida = fechaEntrega.toString().substr(0, 15);
    const condicion = (new Date(year, mes, dia) > new Date());
    if (condicion === false) {
      fechaConvertida = "";
      fechaOrden = "";
    }
    if (fechaConvertida === new Date().toString().substr(0, 15)) {
      fechaConvertida = "";
      fechaOrden = "";
    }

    const horas = this.state.horas;
    const minutos = this.state.minutos;
    const horario = this.state.horario;
    let horarioEntrega = `${horas}:${minutos} ${horario}`

    if (horas === "false" || minutos === "false") {
      horarioEntrega = "";
    }

    const newTarea = {
      tarea: CryptoJS.AES.encrypt(this.state.tarea, 'my-secret-key@123').toString(),
      materia: CryptoJS.AES.encrypt(this.state.materia, 'my-secret-key@123').toString(),
      fechaEntrega: fechaConvertida,
      fecha: fechaOrden,
      horario: horarioEntrega,
      etiquita: this.state.etiqueta,
    };

    this.props.registrarTareas(newTarea);
  };

  habilitarYear = () => {
    this.setState({
      habilitarYear: !this.state.habilitarYear,
    });
  };

  generarMeses = () => {
    let mes = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    let items=[];
    for(let i=0;i<12;i++){
      items.push(<option key={i} value={i}>{mes[i]}</option>);
    }
    return items
  }

  generarDias = () => {
    let items=[];
    for(let i=1;i<32;i++){
      items.push(<option key={i} value={i}>{i}</option>);
    }
    return items
  }

  generarHoras = () => {
    let items=[];
    for(let i=1;i<13;i++){
      if(i<10){
        items.push(<option key={i} value={`0${i}`}>0{i}</option>);
      } else{
        items.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return items
  }

  generarMinutos = () => {
    let items=[];
    for(let i=0;i<60;i++){
      if(i<10){
        items.push(<option key={i} value={`0${i}`}>0{i}</option>);
      } else{
        items.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return items
  }

  handleEtiqueta = (event) => {
    this.setState({etiqueta: event.target.value});
  }

  render() {
    const yearActual = new Date().getFullYear();
    const {
      user: { authenticated },
    } = this.props;

    const { errores } = this.state;

    let registraT = authenticated ? (
      <header className="fondo-lavander">
        <NavbarInicio />
        <main role="main" className="container espacio-top">
          <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-primary rounded shadow-sm">
            <div className="lh-100">
              <h4 className="mb-0 text-white lh-100">
                <i className="fas fa-edit icon-espacio"></i> Agrega tu Tarea /
                Actividad
              </h4>
            </div>
          </div>
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="form-group text-center">
                <div className="row">
                  <div className="col-md-8">
                    <label htmlFor="materia">Materia / Actividad</label>
                    {errores.materia && (
                      <div className="text-danger" role="alert">
                        {errores.materia}
                      </div>
                    )}
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      name="materia"
                      id="materia"
                      placeholder="Ejemplo: Matematicas/Ir a una fiesta"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Etiqueta De Importancia</label>
                    <br></br>
                    <div className="form-group">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="ninguna"
                          id="ninguna"
                          value="#fff"
                          checked={this.state.etiqueta === "#fff"}
                          onChange={this.handleEtiqueta}
                        />
                        <label className="form-check-label" htmlFor="ninguna">
                          Ninguna
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="alta"
                          id="alta"
                          value="#7B241C"
                          checked={this.state.etiqueta === "#7B241C"}
                          onChange={this.handleEtiqueta}
                        />
                        <label
                          className="form-check-label text-danger"
                          htmlFor="alta"
                        >
                          Alta
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="regular"
                          id="regular"
                          value="#F4D03F"
                          checked={this.state.etiqueta === "#F4D03F"}
                          onChange={this.handleEtiqueta}
                        />
                        <label
                          className="form-check-label text-warning"
                          htmlFor="regular"
                        >
                          Regular
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="baja"
                          id="baja"
                          value="#58D68D"
                          checked={this.state.etiqueta === "#58D68D"}
                          onChange={this.handleEtiqueta}
                        />
                        <label
                          className="form-check-label text-success"
                          htmlFor="baja"
                        >
                          Baja
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group text-center">
                <label>Fecha de Entrega / Evento</label>
                {errores.fecha && (
                  <div className="text-danger" role="alert">
                    {errores.fecha}
                  </div>
                )}
                <div className="row text-center">
                  <div className="col-md">
                    <div className="form-group">
                      <label htmlFor="year">Año</label>
                      <br />
                      <select
                        className="form-control"
                        name="year"
                        id="year"
                        disabled={this.state.habilitarYear ? false : true}
                        onChange={this.handleChange}
                      >
                        <option value={yearActual}>{yearActual}</option>
                        <option value={yearActual + 1}>{yearActual + 1}</option>
                        <option value={yearActual + 2}>{yearActual + 2}</option>
                      </select>
                      <div
                        className={
                          this.state.habilitarYear
                            ? "text-success ver"
                            : "text-success ocultar"
                        }
                        role="alert"
                      >
                        Campo habilitado
                      </div>
                      <input
                        type="checkbox"
                        name="activarYear"
                        onChange={this.habilitarYear}
                      />{" "}
                      <label htmlFor="activarYear">Cambiar Año</label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-group">
                      <label htmlFor="mes">Mes</label>
                      <br />
                      <select
                        className="form-control"
                        id="mes"
                        name="mes"
                        onChange={this.handleChange}
                        value={this.state.mes}
                      >
                        {this.generarMeses()}
                      </select>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-group">
                      <label htmlFor="dia">Día</label>
                      <br />
                      <select
                        className="form-control"
                        id="dia"
                        name="dia"
                        onChange={this.handleChange}
                        value={this.state.dia}
                      >
                        {this.generarDias()}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group text-center">
                <label>Hora de Entrega / Actividad</label>
                {errores.horario && (
                  <div className="text-danger" role="alert">
                    {errores.horario}
                  </div>
                )}
                <div className="row">
                  <div className="col-md">
                    <div className="form-group">
                      <label htmlFor="horas">Horas</label>
                      <br />
                      <select
                        className="form-control"
                        name="horas"
                        id="horas"
                        onChange={this.handleChange}
                      >
                        <option value="false">Selecciona una hora</option>
                        {this.generarHoras()}
                      </select>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-group">
                      <label htmlFor="minutos">Minutos</label>
                      <br />
                      <select
                        className="form-control"
                        name="minutos"
                        id="minutos"
                        onChange={this.handleChange}
                      >
                        <option value="false">Selecciona una hora</option>
                        {this.generarMinutos()}
                      </select>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-group">
                      <label htmlFor="horario">Horario</label>
                      <br />
                      <select
                        className="form-control"
                        name="horario"
                        id="horario"
                        onChange={this.handleChange}
                      >
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group text-center">
                <label className="" htmlFor="tarea">
                  Actividad a Realizar
                  {errores.tarea && (
                    <div className="text-danger" role="alert">
                      {errores.tarea}
                    </div>
                  )}
                </label>
                <textarea
                  className="form-control"
                  name="tarea"
                  id="tarea"
                  maxLength="1000"
                  rows="8"
                  cols="80"
                  placeholder="Realizar la siguiente suma: 2+2"
                  required
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div className="form-group text-center">
                <button
                  className="btn btn-primary"
                  type="submit"
                  name="aceptar"
                >
                  Guardar Tarea
                </button>
              </div>
            </form>
          </div>

          <div className="container text-center">
            <div
              className={
                this.state.accion
                  ? "alert alert-success ver"
                  : "alert alert-success ocultar"
              }
              role="alert"
            >
              ¡Tarea/Actividad Registrada! <i className="fas fa-check" />
            </div>
          </div>

        </main>
      </header>
    ) : (
      <div>{(window.location.href = "/inicio")}</div>
    );

    return registraT;
  }
}

RegistrarTarea.propTypes = {
  registrarTareas: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { registrarTareas, clearErrors })(
  RegistrarTarea
);
