import Salas from '../model/salas.js'

class RepositorySalas {
    
    async find() {
        const salas = await Salas.findAll()
        return salas
    }

    async findById(id) {
        const salaDetalhe = await Salas.findByPk(id)
        return salaDetalhe
    }

    async Create(filme, horario, dia, disponivel) {
        const salaCreate = await Salas.create({filme, horario, dia, disponivel})
        return salaCreate
    }

    async Update(id, filme, horario, dia, disponivel) {
        const salaAlterar = await Salas.findByPk(id)

        if(!salaAlterar) {
            throw new Error("sala não encontrado!")
        }

        salaAlterar.filme = filme
        salaAlterar.horario = horario
        salaAlterar.dia = dia
        salaAlterar.disponivel = disponivel

        await salaAlterar.save()
        return salaAlterar
    }

    async Delete(id) {
        const salaDeletar = await Salas.findByPk(id)

        if(!salaDeletar) {
            throw new Error("sala não encontrado!")
        }

        await salaDeletar.destroy()
        return salaDeletar
    }
}

export default new RepositorySalas()