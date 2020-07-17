import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import Edit from './EditarPerfil';
class Perfil extends Component {

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      user: {
        credentials: { nombre, imageURL },
      },
    } = this.props;

    const estilo = {
      margin: "0px",
    };
    return (
      <div className="perfil-top">
        <div className="card rounded text-center shadow-sm">
          <div className="card-body">
            <img
              src={imageURL}
              alt={nombre}
              className="rounded-circle medida-img"
            />
            <div>
              <Edit />
            </div>
            <br />
            <br />
            <h5 className="card-title">
              Bienvenido <strong className="text-primary">{nombre}</strong>
            </h5>
            <p>Tienes {this.props.conteo} tarea(s) pendente(s)</p>
          </div>
          <ul className="list-group list-group-flush">
            <a className="list-group-item card-link" href="/tarea">
              <i className="fas fa-edit"></i> Nueva Tarea
            </a>
            {/* <a className="list-group-item card-link" href="/estadisticas" style={estilo}>
              <i className="fas fa-address-book"></i> Estadisticas
            </a> */}
            <a
              className="list-group-item card-link"
              href="/"
              style={estilo}
              onClick={this.handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesion
            </a>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  logoutUser: PropTypes.func.isRequired,
});

const mapActionsToProps = { logoutUser };

Perfil.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Perfil);
