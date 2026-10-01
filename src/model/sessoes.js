import database from "../config/database.js"

class Sessao {
    constructor() {
        this.model = database.db.define("sessoes", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.db.Sequelize.STRING,
            },
            sala: {
                type: database.db.Sequelize.INTEGER,
            },
            dia: {
                type: database.db.Sequelize.INTEGER,
            },
            horario: {
                type: database.db.Sequelize.STRING,
            }
        })
    }
}

export default new Sessao().model