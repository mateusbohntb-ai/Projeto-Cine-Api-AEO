import database from "../config/database.js"

class Atendente {
    constructor() {
        this.model = database.db.define("atendente", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            telefone: {
                type: database.db.Sequelize.STRING,
                unique: true
            },

            email: {
                type: database.db.Sequelize.STRING,
                unique: true
            },
           
            senha: {
                type: database.db.Sequelize.STRING
            },
// pesquisar sequelize enum
            setor: {
                type: database.db.Sequelize.STRING,
                type: database.db.Sequelize.ENUM('venda de ingressos', 'reprodutor filmes'),
                 allowNull: false,
            }

        })
    }
}
export default new Atendente().model