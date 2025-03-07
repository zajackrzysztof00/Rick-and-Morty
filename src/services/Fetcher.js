import axios from "axios";

class Fetcher {
    constructor(apiURL){
        this.apiURL = apiURL;
    }

    async fetchData(url){
        try {
            return axios.get(`${url}`)
            .then(response => response.data)
        } catch (error) {
            console.error('Error data fetching:', error);
            throw error;
        }
    }
}

export default Fetcher;