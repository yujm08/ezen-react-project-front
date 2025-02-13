import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
  return (
    <BasicLayout>
      <h1>Main Page</h1>
      <div className="flex">
        <Link to="/about">About으로 이동</Link>
      </div>
    </BasicLayout>
  );
}

export default MainPage;