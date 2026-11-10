import ServiceIngresso from "../service/ingressos.js"

class ControllerIngresso {
    async Criar(req, res){
        try {
            const { filme, data, horario, sala, disponivel } = req.body

            await ServiceIngresso.Criar(filme, data, horario, sala, disponivel)

            res.status(201).send({ mensage: "Cadastrado com sucesso"})
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }
//.
// letras maiusculas no nome das func
    async Buscar(req, res){
        try {
            console.log(req.session)

            const ingressos = await ServiceIngresso.Buscar()

            res.status(200).send({ mensage: ingressos })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Detalhe(req, res){
        try {
            const id = req.params.id

            const ingresso = await ServiceIngresso.Detalhe(id)

            res.status(200).send({ mensage: ingresso })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Atualizar(req, res){
        try {
            const { filme, data, horario, sala, disponivel } = req.body
            const id = req.params.id

            await ServiceIngresso.Atualizar(id, filme, data, horario, sala, disponivel)

            res.status(201).send({ mensage: "Atualizado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Deletar(req, res){
        try {
            const identificador = req.params.id

            await ServiceIngresso.Deletar(identificador)

            res.status(204).send({ mensage: "Deletado" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

}

export default new ControllerIngresso()