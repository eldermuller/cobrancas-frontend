import Dashboard from "./Pages/Dashboard";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';




function ProtectedRoutes({ redirecTo }) {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to={redirecTo} />;
}

function MainRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path='home' element={<Dashboard />} />
            </Route>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<Login />} />
        </Routes>
    )
}

export default MainRoutes;