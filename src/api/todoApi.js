//import axios from 'axios'; //axios: 비동기 처리를 위한 라이브러리
import jwtAxios from "../api/util/jwtUtil"

export const API_SERVER_HOST = 'http://localhost:8080';

const  prefix = `${API_SERVER_HOST}/api/todo`;

//비동기 처리를 위한 문법
//async는 await를 사용하기 위한 선언문이라고 생각하면 됨. 함수 표현식의 시작 부분에 작성.
//함수 안에서 await를 사용하려면 함수를 async로 선언해야 함.
export const getOne = async (tno) => {
    const response = await jwtAxios.get(`${prefix}/${tno}`);
    return response.data;
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam;
    const response = await jwtAxios.get(`${prefix}/list`, {params: {page: page, size: size}});
    return response.data;
}