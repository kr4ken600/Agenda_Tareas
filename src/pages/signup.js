import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

class signup extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      nombre: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
        this.setState({errors: nextProps.UI.errors});
    }
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.setState({
        loading: true
    });
    const nuevoUsuario = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        handle: this.state.nombre
    }
    this.props.signupUser(nuevoUsuario, this.props.history);
  }

  handleChange = (event) =>{
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  handleClick = () => {
    window.location.href = "/";
  }

  render() {
    const { UI: { loading }} = this.props;
    const {errors} = this.state;
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
                id="user"
                className="fadeIn second"
                name="nombre"
                onChange={this.handleChange}
                placeholder="Nombre de Usuario"
                required
              />
              {errors.handle && (
                <div className="text-danger" role="alert">
                  {errors.handle}
                </div>
              )}
              <input 
                type="email"
                id="email"
                className="fadeIn second codigo"
                name="email"
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
                onChange={this.handleChange}
                placeholder="Contraseña"
                required
              />
              {errors.password && (
                <div className="text-danger" role="alert">
                  {errors.password}
                </div>
              )}
              <input 
                type="password"
                id="confirmPassword"
                className="fadeIn third codigo"
                name="confirmPassword"
                onChange={this.handleChange}
                placeholder="Confirmar Contraseña"
                required
              />
              {errors.confirmpassword && (
                <div className="text-danger" role="alert">
                  {errors.confirmpassword}
                </div>
              )}
              {errors.error && (
                <div className="text-danger" role="alert">
                  {errors.error}
                </div>
              )}
              <br />
              <button type="submit" className="btn btn-outline-primary" disabled={loading}>
                Iniciar
              </button>
              <br />
              <br />
            </form>
            <div id="formFooter">
              <small>
                ¿Ya tienes una cuenta?{" "}
                <Link className="underlineHover" to="/login">
                  ¡Entra aqui!
                </Link>
              </small>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

signup.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(signup);