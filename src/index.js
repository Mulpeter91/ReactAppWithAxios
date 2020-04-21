import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//defaults object set the default values to all requests being sent from anywhere in the application
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'; //<-- what if we have more than ONE base URL? see the axios.js file for solution
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN EXAMPLE';
axios.defaults.headers.common['Content-Type'] = 'application/json' //though this is the default anyway

//Interceptors are global functions which check for every request leaving your application and every response coming back
//it take a function for the config or 'request'
//this will show the requests we're making to the json placeholder
axios.interceptors.request.use(request => {
    console.log(request); 

    // ... you can also manipulate the requests here, such authorisation to headers etc

    //always requires a return otherwise it blocks the request
    return request; 
}, error => {
    console.log(error);
    //this return promise will ensure the error is sent down to the component, where another catch error will trigger a component specific response
    //such as Blog.js:45
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response); 
    return response; 
}, error => {
    console.log(error);
    return Promise.reject(error);
});

//To drop an interceptor stored it in variable and call eject with that reference as an argument, to remove it :
//  var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
//  axios.interceptors.request.eject(myInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
