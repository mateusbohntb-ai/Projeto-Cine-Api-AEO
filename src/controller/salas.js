import ServiceSalas from '../service/salas.js'

class ControllerSalas {

    async Buscar(_, res) {
        try {
            const salas = await ServiceSalas.Buscar()
            
            res.status(200).send({ salas })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id
            const salas = await ServiceSalas.BuscarUm(id)
            
            res.status(200).send({ salas })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Criar(req, res) {
        try {
            const { filme, horario, dia, disponivel } = req.body
            await ServiceSalas.Criar(filme, horario, dia, disponivel)
            
            res.status(200).send({ message: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Alterar(req, res) {
        try {
            const id = req.params.id
            const { filme, horario, dia, disponivel } = req.body
            await ServiceSalas.Alterar(id, filme, horario, dia, disponivel)
            
            res.status(200).send({ message: "Alterado com sucesso"  })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Deletar(req, res) {
        try {
            const id = req.params.id
            await ServiceSalas.Deletar(id)
            
            res.status(200).send({ message: "Deletado com sucesso"  })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }
}

export default new ControllerSalas()