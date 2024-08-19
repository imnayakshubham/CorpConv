import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const { loginResponse } = useSelector((state: any) => state.login)
    return (
        !!loginResponse?._id ?
            <Outlet /> :
            <Navigate to='/' />
    )
}

export default PrivateRoutes