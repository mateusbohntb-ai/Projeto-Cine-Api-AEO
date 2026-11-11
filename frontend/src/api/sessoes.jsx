import api from './api'

export const getSessoes = async () => {
    const response = await api.get('/v1/sessoes/buscar')

    return response.data.mensagem
}