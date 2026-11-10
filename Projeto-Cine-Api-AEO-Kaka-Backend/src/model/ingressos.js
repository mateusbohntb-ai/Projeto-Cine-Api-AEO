import database from '../config/database.js'

class ingresso {
    constructor() {
        this.model = database.db.define("ingressos", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            filme: {
                type: database.db.Sequelize.STRING,
            },
            data: {
                type: database.db.Sequelize.INTEGER,
            },
            horario: {
                type: database.db.Sequelize.STRING,
            },
            sala: {
                type: database.db.Sequelize.INTEGER,
            },
            disponivel: {
                type: database.db.Sequelize.BOOLEAN,
            }
        })
    }
}

export default new ingresso().model