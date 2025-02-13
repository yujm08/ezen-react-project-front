import React from "react";
import BasicMenu from "../components/menus/BasicMenu";

const BasicLayout = ({ children }) => {
    return (
        <>
        <BasicMenu></BasicMenu>
        
        <div className="bg-white w-full flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">

            <main className="bg-sky-500 md:w-2/3 lg:w-3/4 px-5 py-40">
                {children}
            </main>

            <aside className="bg-green-300 md:w-1/4 lg:w-1/4 px-5 py-40">
                <h1 className="text-2xl md:text-4xl">
                    Sliebar
                </h1>
            </aside>

        </div>
        </>
    );
};

export default BasicLayout;