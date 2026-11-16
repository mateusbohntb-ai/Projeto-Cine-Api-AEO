import { useState, useEffect } from 'react'
import { getFilmes, getFilme } from '../../api/filmes'
import './style.css'

export default function Cliente() {
    const [filmes, setFilmes] = useState([])
    const [busca, setBusca] = useState('')
    const [mensagem, setMensagem] = useState('')

    const carregar = async () => {
        try {
            const lista = await getFilmes()
            setFilmes(lista || [])
            setMensagem('')
        } catch (error) {
            console.log(error)
            setMensagem('Erro ao carregar os filmes')
        }
    }

    useEffect(() => {
        carregar()
    }, [])

    const handleBuscar = async (e) => {
        e.preventDefault()

        if (!busca) {
            carregar()
            return
        }

        try {
            const filme = await getFilme(busca)
            setFilmes([filme])
            setMensagem('')
        } catch (error) {
            console.log(error)
            setFilmes([])
            setMensagem('Filme não encontrado')
        }
    }

    const handleLimpar = () => {
        setBusca('')
        carregar()
    }

    const cards = []

    for (const ok in filmes) {
        const filme = filmes[ok]

        cards.push(
            <div className="cliente-card" key={filme.id}>
                <img src="https://placehold.co/300x450?text=Filme" alt={filme.titulo} />
                <div className="cliente-info">
                    <h3>{filme.titulo}</h3>
                    <p>ID: {filme.id}</p>
                    <p>Dia: {filme.dia}</p>
                    <p>Horário: {filme.horario}</p>
                </div>
            </div>
        )
    }

    return (
        <main className="cliente">
            <h2 className="cliente-titulo">Filmes em cartaz</h2>

            <form className="cliente-busca" onSubmit={handleBuscar}>
                <label htmlFor="busca">Buscar por ID:</label>
                <input
                    type="number"
                    id="busca"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
                <button type="submit">Buscar</button>
                <button type="button" onClick={handleLimpar}>Ver todos</button>
            </form>

            <p className="cliente-mensagem">{mensagem}</p>

            <div className="cliente-grid">
                {cards}
            </div>
        </main>
    )
}