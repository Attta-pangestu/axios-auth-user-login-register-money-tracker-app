import Config from "./config";
const ApiEndpoint = {
    REGISTER : `${Config.BASE_URL}/register`,
    LOGIN : `${Config.BASE_URL}/login`, 
    GET_ALL_TRANSACTION : `${Config.BASE_URL}/transactions`,
    GET_ID_TRANSACTION : (id) =>  `${Config.BASE_URL}/transactions/${id}`, 
    EDIT_TRANSACTION : (id) =>  `${Config.BASE_URL}/transactions/${id}`, 
}

export default ApiEndpoint ; 
