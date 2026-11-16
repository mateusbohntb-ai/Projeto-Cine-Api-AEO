import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to='/login' />
    }

    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000

    if (decoded.exp > currentTime) {
        return <Outlet />
    }

    return <Navigate to='/login' />
}

export default PrivateRoute