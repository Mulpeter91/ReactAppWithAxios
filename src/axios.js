import axios from 'axios';

//this creates an instance of axios
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN OVERRIDE FROM INSTANCE';

//you can also use interceptors here
//instance.interceptors.request...

//You would then import this to replace the default axios object which in turn override any default values
export default instance;