import axios from "axios";

class Fetcher {
    constructor(apiURL){
        this.apiURL = apiURL;
    }

    async fetchData(url){
        try {
            const response = await axios.get(`${url}`)
            .then(response => response.data)
        } catch (error) {
            console.error('Error data fetching:', error);
            throw error;
        }
    }
}

export default Fetcher;