import { lazy, Suspense } from "react";
import todoRouter from "./todoRouter.js"; //이걸 추가하면
import productsRouter from "./productsRouter.js";

const { createBrowserRouter } = require("react-router-dom");

// 보통 import로 가져온 컴포넌트를 변수에 담아서 사용한다.
// 일부러 로딩 지연시키기
const Loading = <div>Loading 중입니다</div>;

const Main = lazy(() => import("../pages/MainPage.js"));
const AboutPage = lazy(() => import("../pages/AboutPage.js"));
const TodoIndex = lazy(() => import("../pages/todo/IndexPage.js"));
const TodoList = lazy(() => import("../pages/todo/ListPage.js"));
const ProductsIndex = lazy(() => import("../pages/products/IndexPage.js"));

const root = createBrowserRouter([
    {
        path: "", // 싱글코테이션, 더블코테이션 둘 다 사용 가능
        // Main을 정상적으로 띄우기 전까지는 Suspense로 Loading이라는 컴포넌트의 내용을 띄운다.
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><AboutPage /></Suspense> // 정적으로 로드된 AboutPage 사용
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>, // 정적으로 로드된 AboutPage 사용
        children: todoRouter()
    },
    {
        path: "products",
        element:<Suspense fallback={Loading}><ProductsIndex /></Suspense>,
        children: productsRouter()
    }
]);

// 외부에서 내가 만든 컴포넌트를 사용할 수 있도록 export로 내보내 줘야 한다.
export default root;