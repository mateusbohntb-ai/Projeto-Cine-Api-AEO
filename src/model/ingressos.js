import database from '../config/database.js'

class ingresso {
    constructor() {
        this.model = database.db.define("ingressos", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncremenet: true
            },
            filme: {
                type: database.db.Sequelize.STRING,
                unique: true
            },
            data: {
                type: database.db.Sequelize.INTEGER,
                unique: true
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