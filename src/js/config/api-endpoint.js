import Config from "./config";
const ApiEndpoint = {
    REGISTER : `${Config.BASE_URL}/register`,
    LOGIN : `${Config.BASE_URL}/login`, 
    GET_ALL_TRANSACTION : `${Config.BASE_URL}/transactions`,
}

export default ApiEndpoint ; 
