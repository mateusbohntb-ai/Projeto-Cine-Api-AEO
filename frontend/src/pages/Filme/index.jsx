import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFilme } from '../../api/filmes'
import { getSessoes } from '../../api/sessoes'
import './style.css'

export default function Filme() {
    const params = useParams()
    const [filme, setFilme] = useState(null)
    const [sessoes, setSessoes] = useState([])
    const [mensagem, setMensagem] = useState('')

    const carregar = async () => {
        try {
            const dadosFilme = await getFilme(params.id)
            setFilme(dadosFilme)

            const todas = await getSessoes()
            const doFilme = []

            for (const ok in todas) {
                if (todas[ok].titulo === dadosFilme.titulo) {
                    doFilme.push(todas[ok])
                }
            }

            setSessoes(doFilme)
        } catch (error) {
            console.log(error)
            setMensagem('Filme não encontrado')
        }
    }

    useEffect(() => {
        carregar()
    }, [])

    if (!filme) {
        return (
            <main className="filme">
                <p className="filme-mensagem">{mensagem}</p>
                <Link to="/cliente">Voltar</Link>
            </main>
        )
    }

    const itens = []

    for (const ok in sessoes) {
        const sessao = sessoes[ok]

        itens.push(
            <li key={sessao.id}>
                Sala {sessao.sala} - {sessao.dia} às {sessao.horario}
            </li>
        )
    }

    return (
        <main className="filme">
            <div className="filme-detalhe">
                <img src="https://placehold.co/300x450?text=Filme" alt={filme.titulo} />

                <div className="filme-info">
                    <h2>{filme.titulo}</h2>
                    <p>Dia: {filme.dia}</p>
                    <p>Horário: {filme.horario}</p>

                    <h3>Sessões</h3>
                    <ul>
                        {itens}
                    </ul>

                    <p className="filme-mensagem">
                        {sessoes.length === 0 && 'Nenhuma sessão cadastrada para este filme'}
                    </p>

                    <Link to="/cliente" className="filme-voltar">Voltar</Link>
                </div>
            </div>
        </main>
    )
}