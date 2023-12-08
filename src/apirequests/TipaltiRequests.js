import { TIPALTI_API_BASE_URL } from "../constants/BaseURLs"
import { staticdata } from "../constants/StaticData";

const Endpoints = {
    EXPENSES: 'expenses'
}



export const getExpenses = async () => {
    
    try {
        const response = await fetch(`${TIPALTI_API_BASE_URL}${Endpoints.EXPENSES}`,{
            headers : {
                "Content-Type": "application/json",
                Username: "travis.payne" // <--- Make sure you change this
            }
        });

        const data = await response.json();
        return data;
    } catch (e) {
        // TODO: Move to useEffect(?), set error flag and message, show in popup, log somewhere useful
        console.log("Error retreiving data from API returning static data instead.")

        return staticdata;
    }
}