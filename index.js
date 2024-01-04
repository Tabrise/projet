const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/vue/.html");// *<- ici mathieu
});

app.listen(8000,()=>{console.log("Serveur à l'écoute")})