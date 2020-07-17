import React, { Component } from 'react';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/es';
import BotonEliminar from './BotonEliminar';
var CryptoJS = require("crypto-js");

class TareasRealizadas extends Component {
  state = {
    accion: false,
  };

  getAccion = () => {
    this.setState({accion: true});

    setTimeout(() => {
      this.setState({
        accion: false,
      });
      window.location.reload(true);
    }, 2000);
  }

  render() {
    dayjs.locale("es");
    dayjs.extend(relativeTime);
    const {
      tarea: { fechaEntrega, materia, tarea, tareaId, horario },
    } = this.props;

    const bytesMateria = CryptoJS.AES.decrypt(materia, 'my-secret-key@123');
    const bytesTarea = CryptoJS.AES.decrypt(tarea, 'my-secret-key@123');

    return (
      <div className="row">
        <div className="col-md-12 espacio-tarea">
          <h5 className="text-grey-dark">{bytesMateria.toString(CryptoJS.enc.Utf8)}</h5>
          <h6 className="text-gray-dark decoracion">
            Para el {dayjs(fechaEntrega).format("dddd DD MMMM YYYY")}  a las {horario}
          </h6>
          <p  className="text-break">{bytesTarea.toString(CryptoJS.enc.Utf8)}</p>
        </div>
        <div className="col-md-12">
          <div className="float-rigth">
            <BotonEliminar tareaId={tareaId} mostrar={this.getAccion}/>
          </div>
          <br />
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
            ¡Tarea Eliminada! <i className="fas fa-check" />
          </div>
        </div>
      </div>
    );
  }
}

export default TareasRealizadas



