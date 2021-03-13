import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiService {
    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto) {
        const requestURL = `${this.apiurl}${url}`
        return httpClient.post(requestURL, objeto);
    }

    put(url, objeto) {
        const requestURL = `${this.apiurl}${url}`
        return httpClient.put(requestURL, objeto);
    }

    delete(url) {
        const requestURL = `${this.apiurl}${url}`
        return httpClient.delete(requestURL);
    }

    get(url) {
        const requestURL = `${this.apiurl}${url}`
        return httpClient.get(requestURL);
    }
}

export default ApiService;