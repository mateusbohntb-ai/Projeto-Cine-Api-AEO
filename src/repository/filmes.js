import Filmes from '../model/filmes.js'

class RepositoryFilmes {
    
    async find() {
        const filmes = await Filmes.findAll()
        return filmes
    }

    async findById(id) {
        const filmeDetalhe = await Filmes.findByPk(id)
        return filmeDetalhe
    }

    async Create(titulo, horario, dia) {
        const filmeCreate = await Filmes.create({titulo, horario, dia})
        return filmeCreate
    }

    async Update(id, titulo, horario, dia) {
        const filmeAlterar = await Filmes.findByPk(id)

        if(!filmeAlterar) {
            throw new Error("Filme não encontrado!")
        }

        filmeAlterar.titulo = titulo
        filmeAlterar.horario = horario
        filmeAlterar.dia = dia

        await filmeAlterar.save()
        return filmeAlterar
    }

    async Delete(id) {
        const filmeDeletar = await Filmes.findByPk(id)

        if(!filmeDeletar) {
            throw new Error("Filme não encontrado!")
        }

        await filmeDeletar.destroy()
        return filmeDeletar
    }
}

export default new RepositoryFilmes()