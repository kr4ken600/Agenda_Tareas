import {
  POST_SCREAM,
  LOADING_DATA,
} from "../types";

const initialState = {
  loading: false,
  tarea: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case POST_SCREAM:
      return {
        ...state,
        tarea: action.payload,
      };
    default:
      return state;
  }
}