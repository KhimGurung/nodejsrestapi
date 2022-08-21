import fetch from 'node-fetch';

enum ServiceProvider {
    google = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=",
    facebook = "https://graph.facebook.com/me?access_token=",
    linkedIn = "https://www.linkedin.com/uas/oauth2/"
}

class VerifyToken{
    token: string;
    constructor(token: string){
        this.token = token;
    }

    isValidToken = async (serviceProvider: string) => {
        let verifyURL!:string;
        if(serviceProvider === "google"){
            verifyURL = `${ServiceProvider.google}${this.token}`;
        }
        const response = await fetch(verifyURL);
        const data = await response.json();
        if(data.error)
            return false;
        return true;
    }
}

export default VerifyToken