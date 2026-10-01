import atendente from "../model/atendente.js"


class RepositoryAtendente {

  async  FindAll() {
  
        const buscartodos = await atendente.findAll()

        return buscartodos

    }

    
   async Find(id) {

           const detalhes = await atendente.findByPk(id)

        return detalhes

    }


    
     async   FindByEmail(email){
         const dados = atendente.findOne({ where: { email } })
         return 
    }


   async Create(email, senha,telefone,setor) {
  const criarusuario = await atendente.create({ email, senha,telefone,setor })

        return criarusuario
    }


   async Update(id,email, senha,telefone,setor) {


        const update = await atendente.findByPk(id)

        if (!update) {
            throw new Error("Carro não encontrado");
        }
        update.email = email
        update.senha = senha
        update.telefone = telefone
        update.setor = setor

        await update.save()

        return update

    }


 async    Delete(id) {
 
        const deleteusuario = await atendente.findByPk(id)

        if (!deleteusuario) {
            throw new Error("Usuario não encontrado");
        }
        await deleteusuario.destroy()

        return deleteusuario
    }


}

export default new RepositoryAtendente()