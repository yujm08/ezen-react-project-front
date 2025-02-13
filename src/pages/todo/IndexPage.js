import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({ pathname:"list"});
  });

  const handleClickAdd = useCallback(() => {
    navigate({ pathname:"add"});
  });

  return (
    <BasicLayout>
      <div className="w-full flex m-2 p-2">
        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
          onClick={handleClickList}  //LIST를 클릭하면 handleClickList 함수로 가
        >
          LIST
        </div>
      </div>

      <div className="w-full flex m-2 p-2">
        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
          onClick={handleClickAdd}  //ADD를 클릭하면 handleClickAdd 함수로 가
        >
          ADD
        </div>
      </div>

      <div className="flex flex-wrap w-full">
        <Outlet></Outlet>
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
