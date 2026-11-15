import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarRecurso, criarRecurso, alterarRecurso, deletarRecurso } from '../../api/recursos'
import './style.css'

const rotulos = {
    titulo: 'Título',
    filme: 'Filme',
    data: 'Data',
    horario: 'Horário',
    dia: 'Dia',
    sala: 'Sala',
    disponivel: 'Disponível'
}

export default function Atendente() {
    const navigate = useNavigate()
    const [aba, setAba] = useState('filmes')
    const [lista, setLista] = useState([])
    const [editandoId, setEditandoId] = useState(null)
    const [mensagem, setMensagem] = useState('')

    const [titulo, setTitulo] = useState('')
    const [filme, setFilme] = useState('')
    const [data, setData] = useState('')
    const [horario, setHorario] = useState('')
    const [dia, setDia] = useState('')
    const [sala, setSala] = useState('')
    const [disponivel, setDisponivel] = useState(false)

    function nomesDaAba(nomeAba) {
        if (nomeAba === 'filmes') {
            return ['titulo', 'horario', 'dia']
        }

        if (nomeAba === 'salas') {
            return ['filme', 'horario', 'dia', 'disponivel']
        }

        if (nomeAba === 'sessoes') {
            return ['titulo', 'sala', 'dia', 'horario']
        }

        return ['filme', 'data', 'horario', 'sala', 'disponivel']
    }

    function chaveDaLista(nomeAba) {
        if (nomeAba === 'sessoes') {
            return 'mensagem'
        }

        if (nomeAba === 'ingressos') {
            return 'mensage'
        }

        return nomeAba
    }

    function rotaAlterar() {
        if (aba === 'ingressos') {
            return 'atualizar'
        }

        return 'alterar'
    }

    function dadosDoForm() {
        if (aba === 'filmes') {
            return { titulo, horario, dia }
        }

        if (aba === 'salas') {
            return { filme, horario, dia, disponivel }
        }

        if (aba === 'sessoes') {
            return { titulo, sala, dia, horario }
        }

        return { filme, data, horario, sala, disponivel }
    }

    function valorDe(nome) {
        if (nome === 'titulo') {
            return titulo
        }

        if (nome === 'filme') {
            return filme
        }

        if (nome === 'data') {
            return data
        }

        if (nome === 'horario') {
            return horario
        }

        if (nome === 'dia') {
            return dia
        }

        if (nome === 'sala') {
            return sala
        }

        return disponivel
    }

    function mudar(nome, valor) {
        if (nome === 'titulo') {
            setTitulo(valor)
        }

        if (nome === 'filme') {
            setFilme(valor)
        }

        if (nome === 'data') {
            setData(valor)
        }

        if (nome === 'horario') {
            setHorario(valor)
        }

        if (nome === 'dia') {
            setDia(valor)
        }

        if (nome === 'sala') {
            setSala(valor)
        }

        if (nome === 'disponivel') {
            setDisponivel(valor)
        }
    }

    function tipoDe(nome) {
        if (nome === 'sala') {
            return 'number'
        }

        return 'text'
    }

    function textoDe(item, nome) {
        if (nome === 'disponivel') {
            if (item.disponivel) {
                return 'Sim'
            }

            return 'Não'
        }

        return item[nome]
    }

    function tratarErro(error, texto) {
        if (error.response) {
            if (error.response.status === 403) {
                localStorage.removeItem('token')
                navigate('/login')
                return
            }
        }

        setMensagem(texto)
    }

    const carregar = async (nomeAba) => {
        try {
            const response = await buscarRecurso(nomeAba)
            setLista(response[chaveDaLista(nomeAba)] || [])
        } catch (error) {
            tratarErro(error, 'Erro ao carregar')
        }
    }

    useEffect(() => {
        carregar(aba)
    }, [aba])

    const limpar = () => {
        setTitulo('')
        setFilme('')
        setData('')
        setHorario('')
        setDia('')
        setSala('')
        setDisponivel(false)
        setEditandoId(null)
    }

    const handleAba = (nomeAba) => {
        setAba(nomeAba)
        limpar()
        setMensagem('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (editandoId) {
                await alterarRecurso(aba, rotaAlterar(), editandoId, dadosDoForm())
                setMensagem('Alterado com sucesso')
            } else {
                await criarRecurso(aba, dadosDoForm())
                setMensagem('Cadastrado com sucesso')
            }

            limpar()
            carregar(aba)
        } catch (error) {
            tratarErro(error, 'Erro ao salvar')
        }
    }

    const handleEditar = (item) => {
        setTitulo(item.titulo || '')
        setFilme(item.filme || '')
        setData(item.data || '')
        setHorario(item.horario || '')
        setDia(item.dia || '')
        setSala(item.sala || '')
        setDisponivel(item.disponivel || false)
        setEditandoId(item.id)
    }

    const handleDeletar = async (id) => {
        try {
            await deletarRecurso(aba, id)
            setMensagem('Deletado com sucesso')
            carregar(aba)
        } catch (error) {
            tratarErro(error, 'Erro ao deletar')
        }
    }

    function classe(nomeAba) {
        if (aba === nomeAba) {
            return 'active'
        }

        return ''
    }

    function celulasDe(item) {
        const celulas = []
        const nomes = nomesDaAba(aba)

        for (const ok in nomes) {
            celulas.push(<td key={nomes[ok]}>{textoDe(item, nomes[ok])}</td>)
        }

        return celulas
    }

    const nomes = nomesDaAba(aba)
    const campos = []
    const cabecalhos = []
    const linhas = []

    for (const ok in nomes) {
        const nome = nomes[ok]

        cabecalhos.push(<th key={nome}>{rotulos[nome]}</th>)

        if (nome === 'disponivel') {
            campos.push(
                <div className="input-group" key={nome}>
                    <label htmlFor={nome}>{rotulos[nome]}:</label>
                    <input
                        type="checkbox"
                        id={nome}
                        checked={valorDe(nome)}
                        onChange={(e) => mudar(nome, e.target.checked)}
                    />
                </div>
            )
        } else {
            campos.push(
                <div className="input-group" key={nome}>
                    <label htmlFor={nome}>{rotulos[nome]}:</label>
                    <input
                        type={tipoDe(nome)}
                        id={nome}
                        required
                        value={valorDe(nome)}
                        onChange={(e) => mudar(nome, e.target.value)}
                    />
                </div>
            )
        }
    }

    for (const ok in lista) {
        const item = lista[ok]

        linhas.push(
            <tr key={item.id}>
                <td>{item.id}</td>
                {celulasDe(item)}
                <td>
                    <button onClick={() => handleEditar(item)}>Editar</button>
                    <button onClick={() => handleDeletar(item.id)}>Excluir</button>
                </td>
            </tr>
        )
    }

    return (
        <main className="atendente">
            <h2 className="section-title">Painel do Atendente</h2>

            <div className="abas">
                <button className={classe('filmes')} onClick={() => handleAba('filmes')}>Filmes</button>
                <button className={classe('salas')} onClick={() => handleAba('salas')}>Salas</button>
                <button className={classe('sessoes')} onClick={() => handleAba('sessoes')}>Sessões</button>
                <button className={classe('ingressos')} onClick={() => handleAba('ingressos')}>Ingressos</button>
            </div>

            <form className="form-recurso" onSubmit={handleSubmit}>
                <h3>{aba}</h3>
                
                

                {campos}

                <button className="button" type="submit">Salvar</button>
                <button className="button cancelar" type="button" onClick={limpar}>Cancelar</button>
            </form>

            <p className="mensagem">{mensagem}</p>

            <table className="tabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        {cabecalhos}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {linhas}
                </tbody>
            </table>
        </main>
    )
}