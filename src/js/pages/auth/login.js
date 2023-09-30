import axios from "axios";
import Auth from "../../network/auth";
import Config from "../../config/config";
import CheckUserAuth from "./check-user-auth";
import Utlis from "../../utlis/utlis";

const Login = {
    async init() {
        CheckUserAuth.checkLoginState() ; 
        this._initialListener() ; 
    },

    _initialListener() {
        const loginForm = document.querySelector('#loginForm') ; 
        loginForm.addEventListener('submit', 
        
            async (event) => {
                event.preventDefault() ;
                event.stopPropagation() ;

                loginForm.classList.add('was-validated'); 
                await this._getLogged() ; 
            }
        );
    }, 

    async _getLogged() {
        const formData = this._getFormData() ;
        
        if(this._validateFormData({...formData})) {
            console.log('Ini Data Form Data') ; 
            console.log(formData) ; 
        }  ; 
        
        try {
            const response = await Auth.Login({
                email : formData.email , 
                password : formData.password,
            }) ;
            Utlis.setUserToken(Config.USER_TOKEN_KEY, response.data.results.token) ; 
            window.alert('User process to logged in') ; 
            
            this._goToDashboard() ; 
        }
        catch(error) {
            console.log('Terjadi Error ', error) ; 
        }
    }, 

    _getFormData() {
        const email = document.querySelector('#validationCustomRecordEmail') ; 
        const password = document.querySelector('#validationCustomRecordEmail') ; 
        
        return {
            email : email.value,
            password : password.value, 
        } ;
    },

    _validateFormData(formData) {
        const formDataFiltered = Object.values(formData).filter(item => item === ''); 
        return formDataFiltered.length === 0 ;
    }, 

    _goToDashboard() {
        window.location.href = '/' ; 
    }
}

export default Login ;