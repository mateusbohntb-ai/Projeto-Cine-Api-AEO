import RepositorySessao from '../repository/sessoes.js'

class ServiceSessao {

    // Core- Regra de Negocio
    async Buscar() {
        return RepositorySessao.find()
    }

    async Detalhe(id) {
        if(!id) {
            throw new Error("Favor informar o ID")
        }

        const sessao = await RepositorySessao.findById(id)
        
        if(!sessao) {
            throw new Error(`ID ${id} do sessao não encontrado`)
        }

        return sessao
    }
    // Função(parametros, parametros, parametros)
    async Criar(titulo, sala, dia, horario) {
         if (!titulo || !sala || !dia || !horario) {
             throw new Error("Favor informar todos os dados")
         }

         const sessao = await RepositorySessao.Create( titulo, sala, dia, horario )

         return sessao
    }

    async Alterar(id, titulo, sala, dia, horario) {
        if (!id || !titulo || !sala || !dia || !horario) {
            throw new Error("Favor informar os dados");
        }

        const sessaoAlterado = await RepositorySessao.Update(id, titulo, sala, dia, horario)

        return sessaoAlterado
    }

    async Deletar(id) {

        if (!id) {
            throw new Error("Favor informar o ID")
        }
        
        const sessao = await RepositorySessao.Delete(id)

        return sessao
    }
}

export default new ServiceSessao()