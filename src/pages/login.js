import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./login.css";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

export class login extends Component {
  
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      correo: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = () => {
    window.location.href = "/";
  }

  render() {
    const {
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <header className="masthead">
        <div className="wrapper fadeInDown colocar text-center">
          <div id="formContent">
            <div className="fadeIn first">
              <img src="/img/logo.png" alt="Icono" id="icon" onClick={this.handleClick} />
            </div>

            <form noValidate onSubmit={this.handleSubmit}>
              <input
                type="text"
                id="login"
                className="fadeIn second"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Correo Electronico"
                required
              />
              {errors.correo && (
                <div className="text-danger" role="alert">
                  {errors.correo}
                </div>
              )}
              <input
                type="password"
                id="password"
                className="fadeIn third codigo"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Contraseña"
                required
              />
              {errors.password && (
                <div className="text-danger" role="alert">
                  {errors.password}
                </div>
              )}
              {errors.error && (
                <div className="text-danger" role="alert">
                  {errors.error}
                </div>
              )}
              <br />
              <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={loading}
              >
                Iniciar
              </button>
              <br />
              <br />
            </form>
            <div id="formFooter">
              <small>
                ¿Aun no tienes una cuenta?{" "}
                <Link className="underlineHover" to="/signup">
                  ¡Registrate aqui!
                </Link>
              </small>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionstoProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionstoProps)(login);
