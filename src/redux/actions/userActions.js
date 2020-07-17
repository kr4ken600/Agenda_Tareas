import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  LOADING_USER,
} from "../types";
import API from "../ApiRedux";

//Login
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  API.post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/inicio");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Registrar usuario
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  API.post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.Token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/inicio");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Terminar sesion
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete API.defaults.headers.common["Authorization"];
  dispatch({ type: SET_AUTHENTICATED });
};

//Datos de usuario
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  API.get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  API
    .post("/user/imagen", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const updateImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  API.post("/user/updateimagen", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
}

//Obtener token
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  API.defaults.headers.common["Authorization"] = FBIdToken;
};
