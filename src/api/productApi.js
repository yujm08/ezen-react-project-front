//import axios from "axios"
import jwtAxios from "../api/util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/products`

export const postAdd = async (product) => {
    const header = {headers : {"Content-Type" : "multipart/form-data"}}
    const res = await jwtAxios.post(`${host}/`, product, header)
    console.log("API 에서 서버 응답:", res.data);
    return res.data
}

export const getList = async ({page, size}) => {
    const res = await jwtAxios.get(`${host}/list`, {params: {page, size}})
    return res.data
}

export const getOne = async (pno) => {
    const res = await jwtAxios.get(`${host}/${pno}`)
    console.log("API 에서 서버 응답:", res.data);
    return res.data
}

export const putOne = async (pno, product) => {
    const header = {headers : {"Content-Type" : "multipart/form-data"}}
    const res = await jwtAxios.put(`${host}/${pno}`, product, header)
    return res.data
}

export const deleteOne = async (pno) => {
    const res = await jwtAxios.delete(`${host}/${pno}`)
    return res.data
}