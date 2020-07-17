import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { uploadImage, updateImage } from "../redux/actions/userActions";
import API from '../redux/ApiRedux';

class PerfilNav extends Component {
  state = {
    imagenesPerfil: [],
  };

  componentDidMount(){
    API.get('/user/imagen')
      .then((res) => {
        const post = res.data;
        this.setState({
          imagenesPerfil: post,
        });
      })
      .catch(err => console.log(err));
  }

  handleImage = (event) => {
    const actual = document.getElementById("actual");
    actual.src = event.target.src;
    const selector = document.getElementById("selector");
    selector.value = "";
  }

  handleCancelar = (imageURL) => {
    const selector = document.getElementById("selector");
    selector.value = "";
    const actual = document.getElementById("actual");
    actual.src = imageURL;
  }

  handleChange = (event) => {
    const archivo = event.target.files[0];
    const objetoUrl = URL.createObjectURL(archivo);
    const mostrar = document.getElementById("actual")
    mostrar.src = objetoUrl;
  }

  handleEditPicture = () => {
    const click = document.getElementById("selector");
    click.click();
  };

  handleImageChange = () => {
    const image = document.getElementById("selector").files[0];
    const imagec = document.getElementById("actual").src;
    if(image){
      const formData = new FormData();
      formData.append('image', image, image.name);
      this.props.uploadImage(formData);
    } else {
      const imagen = {
        imageURL: imagec,
      }
      this.props.updateImage(imagen);
    }
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      user: {
        credentials: { nombre, imageURL },
      },
    } = this.props;
    const style = {
      width: "218px",
      height: "218px",
    }
    const style2 = {
      width: "79px",
      height: "81px",
      cursor: "pointer",
    }

    let imagenes =
      Object.entries(this.state.imagenesPerfil).length !== 0 ? (
        this.state.imagenesPerfil.map((imagen) => (
          <div className="col-4" key={imagen.imagenId}>
            <img
              src={imagen.imageUrl}
              alt={imagen.imageUrl}
              style={style2}
              onClick={this.handleImage}
            />
          </div>
        ))
      ) : (
        <div className="col-md">
          <h6>No se encontraron imagenes</h6>
        </div>
      );

    return (
      <div className="text-center text-white">
        <img
          alt={nombre}
          src={imageURL}
          style={style}
          className="rounded-circle"
          id="actual"
        />
        <div>
          <button
            type="button"
            className="close"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <span>
              <i className="fas fa-user-edit" />
            </span>
          </button>
        </div>
        <br />
        <br />
        <div className="collapse" id="collapseExample">
          <h4 className="text-center">Imagenes Recientes</h4>
          <div className="row">
            {imagenes}
            <div className="col-4">
              <div className="padding-btn">
                <input
                  type="file"
                  id="selector"
                  accept="image/*"
                  onChange={this.handleChange}
                  hidden="hidden"
                />
                <button
                  className="btn btn-outline-primary"
                  onClick={this.handleEditPicture}
                >
                  Subir foto
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            
            <div className="col">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={this.handleImageChange}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
          <br />
          <br />
        </div>
        <h5>
          Bienvenido <strong className="text-primary">{nombre}</strong>
        </h5>
        <p>Tienes {this.props.conteo} tarea(s) pendente(s)</p>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/tarea">
              <i className="fas fa-edit"></i> Nueva Tarea
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="/estadisticas">
              <i className="fas fa-address-book"></i> Estadisticas
            </a>
          </li> */}

          <li className="nav-item">
            <a className="nav-link" href="/" onClick={this.handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesion
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  logoutUser: PropTypes.func.isRequired,
});

const mapActionsToProps = { logoutUser, uploadImage, updateImage };

PerfilNav.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(PerfilNav)
