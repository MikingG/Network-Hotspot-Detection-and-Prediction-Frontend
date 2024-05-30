import axiosInstance from "./index";

const axios = axiosInstance
export const getUsers = () => { return axios.get(`http://127.0.0.1:8000/api/v1/UserInfo/`) }

export const postUser = (username, password) => { return axios.post(`http://127.0.0.1:8000/api/v1/UserInfo/`, { 'username': username, 'password': password }) }
