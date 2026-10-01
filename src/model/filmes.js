import database from "../config/database.js";

class Filmes {
    constructor() {
        this.model = database.db.define("filmes", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            titulo: {
                type: database.db.Sequelize.STRING,
                unique: true,
            },
            horario: {
                type: database.db.Sequelize.STRING,
            },
            dia: {
                type: database.db.Sequelize.STRING,
            }
        })
    }
}

export default new Filmes().model