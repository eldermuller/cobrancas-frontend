import axios from 'axios';


export default axios.create({
    baseURL: 'https://cobranca-bugs.herokuapp.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    mode: "no-cors"
});