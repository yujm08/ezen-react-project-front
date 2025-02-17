import { useDispatch } from "react-redux"
import { logOut } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const LogoutComponent = () => {
    const {doLogout, moveToPath} = useCustomLogin()

    const handleClickLogout = () => {
        doLogout()
        alert("로그아웃 되었습니다")
        moveToPath("/")
    }

    return(
        <div className="border-2 border-red-200 mt-10 m-2 p-4">
            <div className="felx justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-red-500">Logout Component</div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-center">
                    <div className="w-full p-3 text-left font-bold">
                        <button className="rounded p-4 w-36 bg-red-500 text-xl text-white"
                        onClick={handleClickLogout}>Logout</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LogoutComponent;