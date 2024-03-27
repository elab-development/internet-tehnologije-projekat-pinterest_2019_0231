import axios from "axios";

const token = window.sessionStorage.getItem("token");

let instanca = null;

if (token){
    instanca = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
} else {
    instanca = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
    });
}

export default instanca;