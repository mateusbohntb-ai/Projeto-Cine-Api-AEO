import database from "../config/database.js";

class Salas {
    constructor() {
        this.model = database.db.define("salas", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            filme: {
                type: database.db.Sequelize.STRING,
            },
            horario: {
                type: database.db.Sequelize.STRING,
            },
            dia: {
                type: database.db.Sequelize.STRING,
            },
            disponivel: {
                type: database.db.Sequelize.BOOLEAN,
            },
        })
    }
}

export default new Salas().model