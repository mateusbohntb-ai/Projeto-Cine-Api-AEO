import RepositoryIngresso from '../repository/ingressos.js'

class ServiceIngresso {
    async Criar(filme, data, horario, sala, disponivel){
        if(!filme || !data || !horario || !sala || !disponivel) {
            throw new Error("Favor informar todos os dados")
        }

        const ingresso = await RepositoryIngresso.Create( filme, data, horario, sala, disponivel)

        return ingresso
    }

    async Listar(){
        return RepositoryIngresso.find()
    }

    async Buscar(id){
        if(!id) {
            throw new Error("Favor informar o ID")
        }

        const ingresso = await RepositoryIngresso.findById(id)

        if(!ingresso) {
            throw new Error(`ID ${id} do ingresso não encontrada`)
        }

        return ingresso
    }

    async Atualizar(filme, data, horario, sala, disponivel){
        if (!filme || !data || !horario || !sala || !disponivel) {
            throw new Error("Favor informar todos os dados")
        }

        const ingressoAtualizado = await RepositoryIngresso.Update(filme, data, horario, sala, disponivel)

        return ingressoAtualizado
    }

    async Deletar(id){
         if (!id) {
            throw new Error("Favor informar o ID")
         }

         const ingresso = await RepositoryIngresso.Delete(id)

         return ingresso
    }
}

export default new ServiceIngresso()