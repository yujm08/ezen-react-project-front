import { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { setCookie } from "../../api/util/cookieUtil";

const initState = {
    email:'',
    pw:''
}

const LoginComponent = () => {
    const [loginParam, setLoginParam] = useState({...initState})

    const {doLogin, moveToPath} = useCustomLogin()

    const handleChange = (e) => {
        
        loginParam[e.target.name] = e.target.value;

        setLoginParam({...loginParam})
    }

    const handleClickLogin = (e) => {

        //비동기 호출에 사용
        doLogin(loginParam)
        .then(data => {
            console.log(data)
            if(data && data.error) {
                alert("이메일과 패스워드를 확인 후 다시 입력하세요")
            }else{
                setCookie("member", JSON.stringify(data), 1);
                alert("로그인 성공")
                moveToPath('/')
            }
        })
    }

    return(
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            <div className="felx justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Email</div>
                    <input className="w-4/5 p-6 rounded-r border-solid border-neutral-500 shadow-md"
                        name="email"
                        type={'text'}
                        value={loginParam.email}
                        onChange={handleChange}>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Password</div>
                    <input className="w-4/5 p-6 rounded-r border-solid border-neutral-500 shadow-md"
                        name="pw"
                        type={'password'}
                        value={loginParam.pw}
                        onChange={handleChange}>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-center">
                    <div className="w-full p-3 text-left font-bold">
                        <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                        onClick={handleClickLogin}>Login</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginComponent;