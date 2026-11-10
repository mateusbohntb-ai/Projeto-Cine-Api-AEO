import sessao from '../model/sessoes.js'

// INSERT INTO sessao(marca, ano) VALUES ("FIAT", 1998)
class RepositorySessao {
    
    async find() {
        const sessaos = await sessao.findAll()

        return sessaos
    }

    async findById(id) {
        const sessaoDetalhe = await sessao.findByPk(id)

        return sessaoDetalhe
    }

    async Create(titulo, sala, dia, horario) {
        const sessaoCreate = await sessao.create({ titulo, sala, dia, horario})

        return sessaoCreate
    }

    async Update(id, titulo, sala, dia, horario) {
        const sessaoAlterar = await sessao.findByPk(id)

        if(!sessaoAlterar){
            throw new Error("Carro não encontrado")
        }

        sessaoAlterar.titulo = titulo
        sessaoAlterar.sala = sala
        sessaoAlterar.dia = dia
        sessaoAlterar.horario = horario

        await sessaoAlterar.save()

        return sessaoAlterar
    }

    async Delete(id) {
        const sessaoDeletar = await sessao.findByPk(id)

        if(!sessaoDeletar){
            throw new Error("sessao não encontrada")
        }

        await sessaoDeletar.destroy()

        return sessaoDeletar
    }

    async FindByTitulo(titulo) {
        return sessao.findOne({ where: { titulo } })
    }
}

export default new RepositorySessao()