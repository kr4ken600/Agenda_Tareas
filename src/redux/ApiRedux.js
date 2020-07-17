import axios from 'axios';

export default axios.create({
  baseURL: `https://us-central1-tareas-rdt.cloudfunctions.net/api`
});