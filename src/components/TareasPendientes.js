import React, { Component } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import relativeTime from "dayjs/plugin/relativeTime";
import API from "../redux/ApiRedux";
var CryptoJS = require("crypto-js");

class TareasPendientes extends Component {
  state = {
    TID: null,
    accion: false,
    mostrar: true,
    conteo: 0,
  };

  hanldeSubmit = (event) => {
    const envio = { tareaId: this.state.TID };
    event.preventDefault();
    API.post("/marcartarea", envio)
      .then((res) => {
        setTimeout(() => {
          this.setState({
            accion: false,
          });
          window.location.reload(true);
        }, 2000);
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  hanldeClick = (event) => {
    this.setState({
      TID: event.target.value,
      accion: true,
    });
  };

  render() {
    dayjs.locale("es");
    dayjs.extend(relativeTime);
    const {
      tarea: { fechaEntrega, materia, tarea, tareaId, horario, etiquita },
    } = this.props;

    const fechaEntrada = fechaEntrega;
    const fechaActual = new Date();
    const fechaARecortada = fechaActual.toString().substr(0, 15);
    const fechaA = new Date(fechaEntrada);
    const fechaB = new Date(fechaARecortada);
    const restante = fechaA - fechaB;
    const diasRestantes = restante / 86400000;

    const mostrarFecha =
      restante <= 86400000 ? (
        restante <= 0 ? (
          <h6 className="text-gray-dark decoracion">
            Registrado para el {dayjs(fechaEntrega).format("dddd DD MMMM ")} a las {horario}
            <strong className="text-danger"> (Atrazado)</strong>
          </h6>
        ) : (
          <h6 className="text-gray-dark">
            Registrado para el {dayjs(fechaEntrega).format("dddd DD MMMM ")} a las {horario}
            <strong className="text-warning"> (Mañana)</strong>
          </h6>
        )
      ) : (
        <h6 className="text-gray-dark">
          Registrado para el {dayjs(fechaEntrega).format("dddd DD MMMM ")} a las {horario}
          <strong className="text-success">
            {" "}
            (Días restantes: {diasRestantes})
          </strong>
        </h6>
      );

    const border = {
      borderRight: `${etiquita} solid 5px`,
    }
    const bytesMateria = CryptoJS.AES.decrypt(materia, 'my-secret-key@123');
    const bytesTarea = CryptoJS.AES.decrypt(tarea, 'my-secret-key@123');

    return this.state.mostrar ? (
      <div className="row" id={tareaId} style={border}>
        <div className="col-md-12">
          <h5 className="text-grey-dark">{bytesMateria.toString(CryptoJS.enc.Utf8)}</h5>
          {mostrarFecha}
          <p className="text-break">{bytesTarea.toString(CryptoJS.enc.Utf8)}</p>
        </div>
        <div className="col-md-12">
          <div className="float-rigth">
            <form noValidate onSubmit={this.hanldeSubmit}>
              <button
                type="submit"
                value={tareaId}
                className="btn btn-outline-success btn-lg btn-block"
                onClick={this.hanldeClick}
              >
                Marcar Tarea Como Realizado
              </button>
            </form>
            <br />
          </div>
        </div>
        <div className="container text-center">
          <div
            className={
              this.state.accion
                ? "alert alert-success ver"
                : "alert alert-success ocultar "
            }
            role="alert"
          >
            ¡Tarea Realizada! <i className="fas fa-check" />
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default TareasPendientes;
