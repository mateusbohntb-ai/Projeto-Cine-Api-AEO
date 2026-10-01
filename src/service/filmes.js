import RepositoryFilmes from '../repository/filmes.js'

class ServiceFilmes {

    async Buscar() {
        return RepositoryFilmes.find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        const filmes = await RepositoryFilmes.findById(id)

        if (!filmes) {
            throw new Error(`ID ${id} do Filmes não encontrado`)
        }

        return filmes
    }

    async Criar(titulo, horario, dia) {
        if (!titulo || !horario || !dia) {
            throw new Error("Favor informar todos os dados")
        }

        const filmes = await RepositoryFilmes.Create(titulo, horario, dia)
        return filmes
    }

    async Alterar(id, titulo, horario, dia) {
        if (!id || !titulo || !horario || !dia) {
            throw new Error("Favor informar os dados");
        }


        const filmesAlterado = await RepositoryFilmes.Update(id, titulo, horario, dia)
        return filmesAlterado
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        const filmes = await RepositoryFilmes.Delete(id)
        return filmes
    }

}

export default new ServiceFilmes()