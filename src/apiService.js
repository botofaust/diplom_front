import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

export default class APIService{

    constructor(){}


    getReferenceTable() {
    const url = `${API_URL}/api/referencetable/`;
    return axios.get(url).then(response => response.data);
    }

    createReferenceTable(text){
    const url = `${API_URL}/api/referencetable/`;
    return axios.post(url,text);
    }
}