import axios from "axios";
import Auth from "../../network/auth";
import Config from "../../config/config";
import CheckUserAuth from "./check-user-auth";

const Login = {
    async init() {
        CheckUserAuth.checkLoginState() ; 
        this._initialListener() ; 
    },

    _initialListener() {
        
    }
}

export default Login ;