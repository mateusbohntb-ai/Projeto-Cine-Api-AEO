import ServiceAtendente from "../service/atendente.js"


class ControllerAtendente {

   async Buscar( _ ,res ) {
    
             try {
            const logico = await ServiceAtendente.Buscar()
            res.status(200).send({ 
                mensagem: logico
             })

        } catch (error) {
            res.status(500).send({
                mensagem: error.menssage
            })
        }
    }

    


        async  Detalhe( req, res) {
    
            try {

            const id = req.params.id
            const logico = await ServiceAtendente.Detalhe(id)

          await  res.status(200).send({ 
            mensagem: logico
         })

        } catch (error) {
            res.status(500).send({
                mensagem: error.mensage
            })
        }


    }


 async  Login() {

        try {
    
    
    const {email , senha } = req.body
    
    
    const token = await ServiceAtendente.Login(email , senha)
    
    res.status(200).send({
        token
    })
} catch (error) {
    
    res.status(500).send({
        mensage: error.message
    })


    }
 }

  async  Criar() {

       try {

            const { email, senha ,telefone ,setor } = req.body

           await ServiceAtendente.Criar( email, senha,telefone ,setor)

            res.status(201).send({
                mensagem: "Cadastrado com sucesso"
            })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }

    }


   async Alterar() {
   try {
             const { email, senha,telefone ,setor } = req.body
              const id = Number(req.session.id)

            await ServiceAtendente.Alterar(id, email, senha,telefone ,setor)
            
            res.status(201).send({ 
                mensagem: "Alterado  com sucesso"
             })

        } catch (error) {
            res.status(500).send({
                mensagem: error.menssage
            })
        }
    }


  async  Deletar() {

        try {

            const id = req.params.id

         await ServiceAtendente.Deletar(id)

            res.status(204).send({
                mensagem: "Deletado"
            })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }

    }


}

export default new ControllerAtendente()