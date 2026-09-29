import ingresso from "../model/ingressos.js"

class RepositoryIngresso {

    async Create(filme, data, horario, sala, disponivel) {
        const ingressoCreate = await ingresso.create({ filme, data, horario, sala, disponivel })

        return ingressoCreate
    }

    async find() {
        const ingressos = await ingressos.findAll()

        return ingressos
    }

    async findById(id) {
        const ingressoBuscar = await ingresso.findByPk(id)

        return ingressoBuscar
    }

    async Update(id, filme, data, horario, sala, disponivel) {
        const ingressoAlterar = await ingresso.findByPk(id)
        
        if(!ingressoAlterar){
            throw new Error("ingresso não encontrado")
    }
        

    ingressoAlterar.filme = filme
    ingressoAlterar.data = data
    ingressoAlterar.horario = horario
    ingressoAlterar.sala = sala
    ingressoAlterar.disponivel = disponivel

    await ingressoAlterar.save()

    return ingressoAlterar
    }

async Delete(id) {
        const ingressoDeletar = await ingresso.findByPk(id)

        if(!ingressoDeletar){
            throw new Error("ingresso não encontrado")
        }

        await ingressoDeletar.destroy()

        return ingressoDeletar
    }

    async FindByNome(filme) {
        return ingresso.findOne({ where: { filme } })
    }
}


export default new RepositoryIngresso()