import {Cookies} from "react-cookie"

const cookies = new Cookies()

export const setCookie = (name, value, days) => {
    const expires = new Date()

    expires.setUTCDate(expires.getUTCDate() + days) //보관 기간
    //쿠키는 이름과 값, 경로를 설정해 주어야 함. / 이후의 하위 경로에서 쿠키를 사용할 예정
    return cookies.set(name, value, {path:'/', expires:expires})
}

// export const setCookie = (name, value, days) => {
//     console.log("setCookie 시작-----")

//     const expires = new Date()
//     expires.setUTCDate(expires.getUTCDate() + days)
  
//     console.log("expires : " + expires)

//     cookies.set(name, value, {
//       path: "/",
//       expires,
//       // 로컬 개발 시 cross-site 쿠키를 사용하려면 sameSite: 'none' 필수
//       //sameSite: "none",
//       // http 환경이라면 secure: false, https 환경이라면 secure: true
//       // secure: true,
//       // 필요하면 domain: "localhost" 명시
//       domain: "localhost"
//     })
//     console.log("cookie 값: " + cookies)
//     console.log("setCookie 끝-----")
//   }

export const getCookie = (name) => {
    return cookies.get(name)
}

export const removeCookie = (name, path="/") => {
    cookies.remove(name, {path})
}

