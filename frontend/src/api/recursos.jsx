import api from './api'

export const buscarRecurso = async (rota) => {
    const response = await api.get('/v1/' + rota + '/buscar')

    return response.data
}

export const criarRecurso = async (rota, dados) => {
    const response = await api.post('/v1/' + rota + '/criar', dados)

    return response.data
}

export const alterarRecurso = async (rota, rotaAlterar, id, dados) => {
    const response = await api.put('/v1/' + rota + '/' + rotaAlterar + '/' + id, dados)

    return response.data
}

export const deletarRecurso = async (rota, id) => {
    await api.delete('/v1/' + rota + '/deletar/' + id)
}