import { Outlet, Navigate } from "react-router-dom";

export const Authorized = ({ children }) => {
    const user = localStorage.getItem("lu_token"); 
    return user ? (
        <>
            {children} 
            <Outlet />
        </>
    ) : (
        <Navigate to="/" replace />
    );
};


// import { Navigate, Outlet } from "react-router-dom"

// export const Authorized = () => {
//   if (localStorage.getItem("lu_token")) {
//     return <Outlet />
//   }
//   return <Navigate to='/' replace />
// }

