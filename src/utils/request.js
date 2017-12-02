import axios from 'axios';

let instance = axios.create({
  baseURL: 'http://localhost:8000',
});

if (API_ENV === 'prod') {
  instance = axios.create({
  });
}

export default instance;
