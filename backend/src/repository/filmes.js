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
        const update = await Filmes.findByPk(id)

        if(!update) {
            throw new Error("Filme não encontrado!")
        }

        update.titulo = titulo
        update.horario = horario
        update.dia = dia

        await update.save()
        return update
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