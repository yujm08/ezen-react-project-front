import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginPost } from '../api/memberApi';
import { getCookie, removeCookie } from '../api/util/cookieUtil';

const initState = {
    email:''
};

const loadMemberCookie = () => {
    const memberInfo = getCookie("member")

    if(memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }
    return memberInfo
}

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
    return loginPost(param);
})

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState, //쿠키값이 없다면 초기값 사용
    reducers:{
        logIn: (state, action) => {
            console.log("login...")

            const data = action.payload

            return{email:data.email}
        },
        logOut: (state, action) => {
            console.log("logout...")

            removeCookie("member") //쿠키 삭제

            return{...initState}
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fullfiled")

            const payload = action.payload
            return payload;
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected")
        })

    }
});

export const { logIn, logOut } = loginSlice.actions;
export default loginSlice.reducer;