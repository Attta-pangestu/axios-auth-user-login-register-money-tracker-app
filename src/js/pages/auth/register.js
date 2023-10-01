import CheckUserAuth from "./check-user-auth";
import Auth from "../../network/auth";

const Register = {
    async init() {
        CheckUserAuth.checkLoginState() ; 
        this._initalListener() ; 
    },

    _initalListener() {
        const registerForm = document.querySelector('#registerForm') ; 
        registerForm.addEventListener('submit', 
        async (event) => {
            event.preventDefault() ; 
            event.stopPropagation() ; 
            
            registerForm.classList.add('was-validated') ; 
            await this._getRegisted();
        } );

    },

    async _getRegisted() {
        const formData = this._getFormData() ;
        if(this._validateFormData(formData)) {
            console.log('Data semua valid') ; 
            console.log(formData) ; 
        }

        try{
            const response = await Auth.register({
                name : formData.name , 
                email : formData.email, 
                password : formData.password
            }) ; 
            console.log(response.data.results) ; 
            window.alert('Akun Anda berhasil dibuat') ; 
            
            this._goToLoginPage() ; 
        }
        catch(error) {
            console.log('Error saat mendaftarkan akun : ', error) ; 
        }
    },
    
    _goToLoginPage() {
        window.location.href = '/auth/login.html' ; 
    },

    _validateFormData(formData) {
        const filteredData = Object.values(formData).filter(item => item === '') ; 
        return filteredData.length === 0 ;
    },


    _getFormData() {
        const name = document.querySelector('#validationCustomRecordName').value ; 
        const email = document.querySelector('#validationCustomEmail').value ; 
        const password = document.querySelector('#validationCustomPassword').value ; 
        
        return {
            name,
            email, 
            password,
        } ; 
    }

}

export default Register ; 