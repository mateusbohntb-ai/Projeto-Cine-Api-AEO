import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFilmes } from '../../api/filmes'
import './style.css'

export default function Home() {
    const [filmes, setFilmes] = useState([])
    const [mensagem, setMensagem] = useState('')

    const carregar = async () => {
        try {
            const lista = await getFilmes()
            setFilmes(lista || [])

            if (!lista || lista.length === 0) {
                setMensagem('Nenhum filme em cartaz')
            }
        } catch (error) {
            console.log(error)

            const resposta = error.response

            if (resposta && resposta.data && resposta.data.message) {
                setMensagem('Erro do back: ' + resposta.data.message)
            } else {
                setMensagem('Erro ao carregar os filmes')
            }
        }
    }

    useEffect(() => {
        carregar()
    }, [])

    const cards = []

    for (const ok in filmes) {
        const filme = filmes[ok]

        cards.push(
            <div className="movie-card" key={filme.id}>
                <img src="https://placehold.co/300x450?text=Filme" alt={filme.titulo} />

                <div className="movie-info">
                    <h3>{filme.titulo}</h3>
                    <p>Dia: {filme.dia}</p>
                    <p>Horário: {filme.horario}</p>
                    <Link to={'/filmes/' + filme.id} className="buy-button">
                        Ver sessões
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="cinema-section">
                <h2>Bem-vindo ao Cine Api</h2>
                <p>Confira os filmes em cartaz e as sessões disponíveis.</p>
            </section>

            <main className="home">
                <h2 className="section-title">Filmes em cartaz</h2>

                <p className="home-mensagem">{mensagem}</p>

                <div className="movie-grid">
                    {cards}
                </div>
            </main>
        </>
    )
}