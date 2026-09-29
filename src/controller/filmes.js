import ServiceFilmes from '../service/filmes.js'

class ControllerFilmes {

    async Buscar(_, res) {
        try {
            const filmes = await ServiceFilmes.Buscar()
            
            res.status(200).send({ filmes })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id
            const filmes = await ServiceFilmes.BuscarUm(id)
            
            res.status(200).send({ filmes })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Criar(req, res) {
        try {
            const { titulo, horario, dia } = req.body
            await ServiceFilmes.Criar(titulo, horario, dia)
            
            res.status(200).send({ message: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Alterar(req, res) {
        try {
            const id = req.params.id
            const { titulo, horario, dia } = req.body
            await ServiceFilmes.Alterar(id, titulo, horario, dia)
            
            res.status(200).send({ message: "Alterado com sucesso"  })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Deletar(req, res) {
        try {
            const id = req.params.id
            await ServiceFilmes.Deletar(id)
            
            res.status(200).send({ message: "Deletado com sucesso"  })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }
}

export default new ControllerFilmes()