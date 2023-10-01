import axios from "axios";
import ApiEndpoint from "../config/api-endpoint";
import Utlis from "../utlis/utlis";
import Config from "../config/config";

const Transaction = {
    async GET_ALL_TRANSACTION() {
        const transactionsData = await axios.get(ApiEndpoint.GET_ALL_TRANSACTION, {
            headers : {
                Authorization : `Bearer ${Utlis.getUserToken(Config.USER_TOKEN_KEY)}`
            }
        }) ; 
        return transactionsData ;
    },
    async addTransaction({name, date, amount, type, description, evidence}) {
        return axios.post(ApiEndpoint.GET_ALL_TRANSACTION, {name, date, amount, type,  description, evidence}, {
            headers : {
                'Content-Type' : 'multipart/form-data', 
                'Authorization' : `Bearer ${Utlis.getUserToken(Config.USER_TOKEN_KEY)}`
            }
        })  ;
    }
}

export default Transaction ; 