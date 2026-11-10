import RepositorySalas from '../repository/salas.js'

class ServiceSalas {

    async Buscar() {
        return RepositorySalas.find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        const salas = await RepositorySalas.findById(id)

        if (!salas) {
            throw new Error(`ID ${id} do Salas não encontrado`)
        }

        return salas
    }

    async Criar(filme, horario, dia, disponivel) {
        if (!filme || !horario || !dia || !disponivel === undefined) {
            throw new Error("Favor informar todos os dados")
        }

        const salas = await RepositorySalas.Create(filme, horario, dia, disponivel)
        return salas
    }

    async Alterar(id, filme, horario, dia, disponivel) {
        if (!id || !filme || !horario || !dia || !disponivel === undefined) {
            throw new Error("Favor informar os dados");
        }


        const salasAlterado = await RepositorySalas.Update(id, filme, horario, dia, disponivel)
        return salasAlterado
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        const salas = await RepositorySalas.Delete(id)
        return salas
    }

}

export default new ServiceSalas()