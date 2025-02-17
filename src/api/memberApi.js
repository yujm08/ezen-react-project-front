import jwtAxios from "../api/util/jwtUtil"
import {API_SERVER_HOST} from "./todoApi"

const host = `${API_SERVER_HOST}/api/member`

export const loginPost = async (loginParam) => {
    const header = {headers : {"Content-Type" : "x-www-from-urlencoded"}}

    const from = new FormData()
    from.append('username', loginParam.email)
    from.append('password', loginParam.pw)

    const res = await jwtAxios.post(`${host}/login`, from, header)

    return res.data;
}