import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {

  const navigate = useNavigate();

  //추가
  const [refresh, setRefresh] = useState(false)

  const [queryParams] = useSearchParams();

  //수정
  const page = getNum(queryParams.get('page'), 1)
  const size = getNum(queryParams.get('size'), 10)

  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParams) => {

    let queryStr = "";

    if (pageParams) {
      const pageNum = getNum(pageParams.page, 1);
      const sizeNum = getNum(pageParams.size, 10);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    setRefresh(!refresh) //추가

    navigate({
      pathname: "../list",
      search: queryStr,
    });
  };

  const moveToModify = (num) => {
    console.log(queryDefault);

    navigate({
      pathname: `../modify/${num}`,
      search: queryDefault,
    });
  };

  //추가
  const moveToRead = (num) => {
    console.log(queryDefault)

    navigate({
      pathname: `../read/${num}`,
      search:queryDefault
    })
  };

  return { moveToList, page, size, moveToModify, refresh, moveToRead};
};

export default useCustomMove;
