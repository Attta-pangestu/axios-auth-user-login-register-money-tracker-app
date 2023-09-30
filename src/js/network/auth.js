import axios from 'axios' ; 
import ApiEndpoint from '../config/api-endpoint';

const Auth = {
    async register({name, username, email, password}) {
        return await axios.post(ApiEndpoint.REGISTER, {name, username, email, password}) ; 
    }, 
    async login({username, password}) {
        return await axios.post(ApiEndpoint.LOGIN, {username, password}) ; 
    }
}

export default Auth ; 