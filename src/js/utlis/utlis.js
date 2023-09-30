const Utlis = {
    setUserToken(key,value) {
        return sessionStorage.setItem(key,value); 
    },
    getUserToken(key) {
        return sessionStorage.getItem(key);
    }, 
}

export default Utlis ; 