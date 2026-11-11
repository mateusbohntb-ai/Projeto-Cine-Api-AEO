import api from './api'

export const loginAtendente = async (email, senha) => {
    const body = { email, senha }
    const response = await api.post('/v1/atendente/Login', body, {
        headers: { 'Content-Type': 'application/json' }
    })

    return response.data
}