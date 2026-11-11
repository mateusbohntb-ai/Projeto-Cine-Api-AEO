import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarUser } from '../../api/user'
import './style.css'

function Signin() {
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await criarUser(nome, email, senha)
            navigate('/login')
        } catch (error) {
            setMensagem('Erro ao cadastrar')
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Cadastro</h2>

                <div className="input-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

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

                <button className="button" type="submit">Cadastrar</button>

                <p>
                    Já tem conta?{' '}
                    <span className="signup" onClick={() => navigate('/login')}>Entrar</span>
                </p>
            </form>
        </div>
    )
}

export default Signin