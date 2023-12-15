import axios from 'axios';
// import { error as eMessage } from '../assecs/json';

const baseURL = process.env.REACT_APP_API_URL;

axios.defaults.timeout = 300000;
axios.defaults.baseURL = baseURL;
axios.defaults.headers = { 'Content-Type': 'application/json' };

const Interceptor = () => {
    axios.interceptors.request.use(
        request => {
            const token = localStorage.getItem('authorization');

            if (token)
                // request.headers.Authorization = `Bearer ${token}`;
                request.headers['x-access-token'] = token;

            return request;
        },
        error => console.log('interceptors request error', error)
    );

    axios.interceptors.response.use(
        response => {
            const { status, data } = response;

            return Promise.resolve(data);
        },
        error => {
            console.log('interceptors response error:', error)
            return Promise.reject(error.response);
        }
    )
};

export default Interceptor;