import axios from 'axios';

axios.interceptors.request.use(request => {
    request.headers.common['Access-Control-Allow-Origin'] = '*';
    if (localStorage.getItem('token')) {
        request.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
            'token'
        )}`;
    }
    return request;
});


export default axios;