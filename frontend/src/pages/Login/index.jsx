import { useState } from 'react'
import './style.css'
import { loginAtendente } from '../../api/atendente'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await loginAtendente(email, senha)
            localStorage.setItem('token', response.token)

            navigate('/atendente')
        } catch (error) {
            setMensagem('Email ou senha inválido')
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login do Atendente</h2>

                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <p>{mensagem}</p>

                <button className="button" type="submit">Entrar</button>
                <button
                    className="button back-button"
                    type="button"
                    onClick={() => navigate('/')}
                >
                    Voltar
                </button>
            </form>
        </div>
    )
}