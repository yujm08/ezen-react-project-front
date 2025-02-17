import {Cookies} from "react-cookie"

const cookies = new Cookies()

export const setCookie = (name, value, days) => {
    const expires = new Date()

    expires.setUTCDate(expires.getUTCDate() + days) //보관 기간
    //쿠키는 이름과 값, 경로를 설정해 주어야 함. / 이후의 하위 경로에서 쿠키를 사용할 예정
    return cookies.set(name, value, {path:'/', expires:expires})
}

export const getCookie = (name) => {
    return cookies.get(name)
}

export const removeCookie = (name, path="/") => {
    cookies.remove(name, {path})
}

