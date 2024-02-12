import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoutes = () => {
    const { loginResponse } = useSelector(state => state.login)
    return (
        !!loginResponse?._id ? <Outlet /> : <Navigate to='/' />
    )
}