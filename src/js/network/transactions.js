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
    async getIdTransaction(id) {
        const transactionId = await axios.get(ApiEndpoint.GET_ID_TRANSACTION(id), {
            headers : {
                Authorization : `Bearer ${Utlis.getUserToken(Config.USER_TOKEN_KEY)}` 
            }
        }) ; 
        return transactionId ; 
    },
    async addTransaction({name, date, amount, type, description, evidence}) {
        return axios.post(ApiEndpoint.GET_ALL_TRANSACTION, {name, date, amount, type,  description, evidence}, {
            headers : {
                'Content-Type' : 'multipart/form-data', 
                'Authorization' : `Bearer ${Utlis.getUserToken(Config.USER_TOKEN_KEY)}`
            }
        })  ;
    }, 
    async editTransaction( id,{name, date, amount, type, description, evidence}) {
        return await axios.put(ApiEndpoint.EDIT_TRANSACTION(id),{name, date, amount, type, description, evidence}, {
            headers : {
                'Content-Type' : 'multipart/form-data', 
                'Authorization' : `Bearer ${Utlis.getUserToken(Config.USER_TOKEN_KEY)}`
            }
        })
    }, 

    async deleteTransactions(id) {
        return await axios.delete(ApiEndpoint.DEL_TRANSACTION(id), {
            headers : {
                'Authorization' : `Bearer ${Utlis.getUserToken(Config.USER_TOKEN_KEY)}`
            }
        })
    } 
}

export default Transaction ; 