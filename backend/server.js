import dotenv from "dotenv"
import app from './App.js'

dotenv.config();


app.listen(process.env.PORT, () => {
    console.log("servidor rodando")
})



