import Config from "../../config/config";
import Utlis from "../../utlis/utlis";

const CheckUserAuth = {
    excludeRedirectPage : ['login.html', 'register.html'], 

    async checkLoginState() {
        const userToken = Utlis.getUserToken(Config.USER_TOKEN_KEY) ; 
        const isUserSignedIn = Boolean(userToken) ; 
        const isUserOnPage = this._isUserOnPage(this.excludeRedirectPage) ; 
        
        if(isUserOnPage) {
            console.log('Berada di halaman pengecualian redirect') ; 
        } else {
            console.log('Tidak masuk dalam pengecualian') ;
        }

        if(isUserSignedIn) {
            if(isUserOnPage) {
                window.location.href = '/' ; 
                window.alert('Anda Sudah Login') ; 
            } else  {
                this._showLoginOrUserLogMenu(isUserSignedIn)     ;
            }
        }else {
            if(!isUserOnPage) {
                window.location.href = '/auth/login.html' ; 
            } 
        }
    }, 

    _showLoginOrUserLogMenu(userLoginState) {
        const loginMenu = document.querySelector('#loginMenu') ; 
        const userLoggedMenu = document.querySelector('#userLoggedMenu') ; 
        if(!userLoginState) {
            loginMenu?.classList.add('d-block') ;
            loginMenu?.classList.remove('d-none') ;

            userLoggedMenu?.classList.add('d-none') ; 
            userLoggedMenu?.classList.remove('d-block') ; 
        };
        
        loginMenu?.classList.add('d-none') ; 
        loginMenu?.classList.remove('d-block') ; 

        userLoggedMenu?.classList.add('d-block') ; 
        userLoggedMenu?.classList.remove('d-none') ; 
    },

    _isUserOnPage(pages) {
        const filteredPages = pages.filter(item => {
            return window.location.pathname.endsWith(item) ; 
        }) ;
        console.log('ini halaman yang difilter',filteredPages) ; 
        return Boolean(filteredPages.length) ; 
    },
}
export default CheckUserAuth ; 