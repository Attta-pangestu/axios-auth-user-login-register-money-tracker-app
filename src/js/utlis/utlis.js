const Utlis = {
    setUserToken(key,value) {
        return sessionStorage.setItem(key,value); 
    },
    getUserToken(key) {
        return sessionStorage.getItem(key);
    }, 
    getTransactionId(event) {
        
    }
}

export default Utlis ; 