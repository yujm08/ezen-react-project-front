import axios from "axios";
import { getCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../todoApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = {headers : {'Authorization' : `Bearer${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    console.log("--------------------------")
    console.log(res.data)
}

const beforeReq = (config) => {
    console.log("before request............");

    const memberInfo = getCookie("member")

    if(!memberInfo) {
        console.log("Member Not Found")
        return Promise.reject(
            {
                response:
                {
                    data:{error:"REQUIRE_LOGIN"}
                }
            }
        )
    }

        const {accessToken} = memberInfo
        config.headers.Authorization = `Bearer${accessToken}`

    return config;
}

const requestFail = (err) => {
    console.log("request error............");
    return Promise.reject(err);
}

const beforeRes = async (res) => {
    console.log("before return response............")
    return res;
}

const responseFail = (err) => {
    console.log("response error............");
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;