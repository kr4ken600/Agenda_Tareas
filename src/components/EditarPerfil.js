import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadImage, updateImage } from "../redux/actions/userActions";
import API from '../redux/ApiRedux';

//import Reciente from './imagenesRecientes';

class EditarPerfil extends Component {
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

  render() {
    const {
      user:
        {credentials: {imageURL}}
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
          <div className="col-3" key={imagen.imagenId}>
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
      <div>
        <button
          type="button"
          className="close"
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@mdo"
        >
          <span>
            <i className="fas fa-user-edit" />
          </span>
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Cambia Tu Foto De Perfil
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container text-center">
                  <h1>Imagen Actual</h1>
                  <img
                    src={imageURL}
                    alt="profile"
                    id="actual"
                    style={style}
                    className="rounded-circle"
                  />
                </div>
                <br />
                <div>
                  <h4 className="text-center">Imagenes Recientes</h4>
                    <div className="row">{imagenes}</div>  
                  <br />
                  <br />
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
              <div></div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.handleImageChange}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { uploadImage, updateImage };

EditarPerfil.propTypes = {
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(EditarPerfil);
