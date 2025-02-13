import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/products`

export const postAdd = async (product) => {
    const header = {headers : {"Content-Type" : "multipart/form-data"}}
    const res = await axios.post(`${host}/`, product, header)
    console.log("API 에서 서버 응답:", res.data);
    return res.data
}

export const getList = async ({page, size}) => {
    const res = await axios.get(`${host}/list`, {params: {page, size}})
    return res.data
}

export const getOne = async (pno) => {
    const res = await axios.get(`${host}/${pno}`)
    return res.data
}

export const putOne = async (pno, product) => {
    const header = {headers : {"Content-Type" : "multipart/form-data"}}
    const res = await axios.put(`${host}/${pno}`, product, header)
    return res.data
}