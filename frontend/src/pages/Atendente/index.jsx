import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarRecurso, criarRecurso, alterarRecurso, deletarRecurso } from '../../api/recursos'
import './style.css'

const recursos = {
    filmes: {
        nome: 'Filmes',
        rota: 'filmes',
        chaveLista: 'filmes',
        rotaAlterar: 'alterar',
        campos: [
            { nome: 'titulo', label: 'Título', tipo: 'text' },
            { nome: 'horario', label: 'Horário', tipo: 'text' },
            { nome: 'dia', label: 'Dia', tipo: 'text' }
        ]
    },
    salas: {
        nome: 'Salas',
        rota: 'salas',
        chaveLista: 'salas',
        rotaAlterar: 'alterar',
        campos: [
            { nome: 'filme', label: 'Filme', tipo: 'text' },
            { nome: 'horario', label: 'Horário', tipo: 'text' },
            { nome: 'dia', label: 'Dia', tipo: 'text' },
            { nome: 'disponivel', label: 'Disponível', tipo: 'checkbox' }
        ]
    },
    sessoes: {
        nome: 'Sessões',
        rota: 'sessoes',
        chaveLista: 'mensagem',
        rotaAlterar: 'alterar',
        campos: [
            { nome: 'titulo', label: 'Título', tipo: 'text' },
            { nome: 'sala', label: 'Sala', tipo: 'number' },
            { nome: 'dia', label: 'Dia', tipo: 'text' },
            { nome: 'horario', label: 'Horário', tipo: 'text' }
        ]
    },
    ingressos: {
        nome: 'Ingressos',
        rota: 'ingressos',
        chaveLista: 'mensage',
        rotaAlterar: 'atualizar',
        campos: [
            { nome: 'filme', label: 'Filme', tipo: 'text' },
            { nome: 'data', label: 'Data', tipo: 'text' },
            { nome: 'horario', label: 'Horário', tipo: 'text' },
            { nome: 'sala', label: 'Sala', tipo: 'number' },
            { nome: 'disponivel', label: 'Disponível', tipo: 'checkbox' }
        ]
    }
}

function formVazio(config) {
    const form = {}

    for (let ok = 0; ok < config.campos.length; ok++) {
        const campo = config.campos[ok]
        form[campo.nome] = campo.tipo === 'checkbox' ? false : ''
    }

    return form
}

export default function Atendente() {
    const navigate = useNavigate()
    const [aba, setAba] = useState('filmes')
    const [lista, setLista] = useState([])
    const [form, setForm] = useState(formVazio(recursos.filmes))
    const [editandoId, setEditandoId] = useState(null)
    const [mensagem, setMensagem] = useState('')

    const config = recursos[aba]

    const tratarErro = (error, textoPadrao) => {
        console.log(error)

        if (error.response && error.response.status === 403) {
            localStorage.removeItem('token')
            navigate('/login')
            return
        }

        const resposta = error.response ? error.response.data : null
        const texto = resposta ? (resposta.message || resposta.mensagem) : null

        setMensagem(texto || textoPadrao)
    }

    const carregar = async (chave) => {
        try {
            const dados = await buscarRecurso(recursos[chave].rota)
            setLista(dados[recursos[chave].chaveLista] || [])
        } catch (error) {
            tratarErro(error, 'Erro ao carregar')
        }
    }

    useEffect(() => {
        carregar(aba)
    }, [aba])

    const handleAba = (chave) => {
        setAba(chave)
        setForm(formVazio(recursos[chave]))
        setEditandoId(null)
        setMensagem('')
    }

    const handleChange = (campo, e) => {
        const valor = campo.tipo === 'checkbox' ? e.target.checked : e.target.value
        setForm({ ...form, [campo.nome]: valor })
    }

    const limpar = () => {
        setForm(formVazio(config))
        setEditandoId(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (editandoId) {
                await alterarRecurso(config.rota, config.rotaAlterar, editandoId, form)
                setMensagem('Alterado com sucesso')
            } else {
                await criarRecurso(config.rota, form)
                setMensagem('Cadastrado com sucesso')
            }

            limpar()
            carregar(aba)
        } catch (error) {
            tratarErro(error, 'Erro ao salvar')
        }
    }

    const handleEditar = (item) => {
        const novo = {}

        for (let ok = 0; ok < config.campos.length; ok++) {
            const nome = config.campos[ok].nome
            novo[nome] = item[nome]
        }

        setForm(novo)
        setEditandoId(item.id)
    }

    const handleDeletar = async (id) => {
        try {
            await deletarRecurso(config.rota, id)
            setMensagem('Deletado com sucesso')
            carregar(aba)
        } catch (error) {
            tratarErro(error, 'Erro ao deletar')
        }
    }

    return (
        <main className="atendente">
            <h2 className="section-title">Painel do Atendente</h2>

            <div className="abas">
                {Object.keys(recursos).map((chave) => (
                    <button
                        key={chave}
                        className={chave === aba ? 'active' : ''}
                        onClick={() => handleAba(chave)}
                    >
                        {recursos[chave].nome}
                    </button>
                ))}
            </div>

            <form className="form-recurso" onSubmit={handleSubmit}>
                <h3>{editandoId ? 'Editar ' : 'Novo '}{config.nome}</h3>

                {config.campos.map((campo) => (
                    <div className="input-group" key={campo.nome}>
                        <label htmlFor={campo.nome}>{campo.label}:</label>

                        {campo.tipo === 'checkbox' ? (
                            <input
                                type="checkbox"
                                id={campo.nome}
                                checked={form[campo.nome]}
                                onChange={(e) => handleChange(campo, e)}
                            />
                        ) : (
                            <input
                                type={campo.tipo}
                                id={campo.nome}
                                required
                                value={form[campo.nome]}
                                onChange={(e) => handleChange(campo, e)}
                            />
                        )}
                    </div>
                ))}

                <button className="button" type="submit">
                    {editandoId ? 'Salvar' : 'Cadastrar'}
                </button>

                {editandoId && (
                    <button className="button cancelar" type="button" onClick={limpar}>
                        Cancelar
                    </button>
                )}
            </form>

            <p className="mensagem">{mensagem}</p>

            <table className="tabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        {config.campos.map((campo) => (
                            <th key={campo.nome}>{campo.label}</th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            {config.campos.map((campo) => (
                                <td key={campo.nome}>
                                    {campo.tipo === 'checkbox'
                                        ? (item[campo.nome] ? 'Sim' : 'Não')
                                        : item[campo.nome]}
                                </td>
                            ))}
                            <td>
                                <button onClick={() => handleEditar(item)}>Editar</button>
                                <button onClick={() => handleDeletar(item.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}