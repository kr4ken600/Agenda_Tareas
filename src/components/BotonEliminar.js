import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTarea } from '../redux/actions/dataActions';
 
class BotonEliminar extends Component {
  eliminarTarea = () => {
    this.props.deleteTarea(this.props.tareaId);
    this.props.mostrar();
  }

  mostrar = () => {
    console.log(this.props.tareaId);
  }

  render() {
    return (
      <Fragment>
        <button 
          onClick={this.eliminarTarea}
          className="btn btn-outline-danger btn-lg btn-block"
        >
            Elimianar Tarea de la Lista
        </button>
      </Fragment>
    )
  }
}

BotonEliminar.propTypes = {
  deleteTarea: PropTypes.func.isRequired,
  tareaId: PropTypes.string.isRequired
};

export default connect(null, { deleteTarea })(BotonEliminar);
