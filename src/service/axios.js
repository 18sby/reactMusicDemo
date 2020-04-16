import axios from 'axios';

// axios.defaults.baseURL = 'http://tingapi.ting.baidu.com/v1/restserver/ting';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 20000;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export { axios }