import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;
const TodoList = lazy(() => import("../pages/todo/ListPage.js"));
const ReadPage = lazy(() => import("../pages/todo/ReadPage.js"));
const AddPage = lazy(() => import("../pages/todo/AddPage.js"));
const TodoModify = lazy(() => import("../pages/todo/ModifyPage.js"));

const todoRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><TodoList /></Suspense>
        },
        {
            path: "", //todo로만 호출해도 자동으로 /todo/list로 이동
            element: <Navigate replace to="list"></Navigate>
        },
        {
            path: "read/:tno",
            element: <Suspense fallback={Loading}><ReadPage /></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><AddPage /></Suspense>
        },
        {
            path: "modify/:tno",
            element: <Suspense fallback={Loading}><TodoModify /></Suspense>
        }
    ];
}

export default todoRouter;