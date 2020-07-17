import {
  LOADING_UI,
  CLEAR_ERRORS,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_ERRORS,
  LOADING_DATA,
} from "../types";
import API from '../ApiRedux';

export const registrarTareas = (newTarea) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  API.post("/registrartarea", newTarea)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch(clearErrors());
      dispatch({
        type: LOADING_DATA,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    });
};

export const deleteTarea = (tareaId) => (dispatch) =>{
  API
    .delete(`/eliminartarea/${tareaId}`)
    .then(() =>{
      dispatch({ type: DELETE_SCREAM, payload: tareaId});
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};