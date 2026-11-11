import './style.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header>
            <Link to="/" className="logo">Cine Api</Link>

            <nav>
                <Link to="/">Início</Link>

                {!token && <Link to="/login">Login</Link>}
                {token && <Link to="/atendente">Atendente</Link>}
                {token && <a href="#" onClick={handleLogout}>Sair</a>}
            </nav>
        </header>
    )
}

export default Header