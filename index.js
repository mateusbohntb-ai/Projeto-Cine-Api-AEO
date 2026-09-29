import app from "./app.js"
import database from "./config/database.js"



database.db
.sync({force: false})
.then((_)=>{
    app.listen(3000, ()=>{
        console.log("servidor rodando porta 3000")
    })
})

.catch((e)=>{
    console.log(e)
})