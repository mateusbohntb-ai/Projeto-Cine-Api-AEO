import api from './api'

export const getFilmes = async () => {
    const response = await api.get('/v1/filmes/buscar')

    return response.data.filmes
}

export const getFilme = async (id) => {
    const response = await api.get('/v1/filmes/detalhe/' + id)

    return response.data.filmes
}