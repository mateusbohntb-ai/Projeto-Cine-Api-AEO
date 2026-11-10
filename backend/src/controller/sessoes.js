import ServiceSessao from '../service/sessoes.js'

class ControllerSessao {
    // Recebimento e a Saida das info
    async Buscar(req, res) {  
        try {
            console.log(req.session)
            const sessoes = await ServiceSessao.Buscar()
            res.status(200).send({ mensagem: sessoes })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id

            const sessao = await ServiceSessao.Detalhe(id)

            res.status(200).send({ mensagem: sessao })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { titulo, sala, dia, horario } = req.body

            await ServiceSessao.Criar(titulo, sala, dia, horario)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Alterar(req, res) {
        try {
            const { titulo, sala, dia, horario } = req.body
            const id = req.params.id

            await ServiceSessao.Alterar(id, titulo, sala, dia, horario)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Deletar(req, res) {
        try {
            const identificador = req.params.id

            await ServiceSessao.Deletar(identificador)

            res.status(204).send({ mensagem: "Deletado" })
        } catch (error) {
            
            res.status(500).send({
                mensagem: error.message
            })
        }
    }
}

export default new ControllerSessao()