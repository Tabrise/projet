const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const databaseRoute = require('./routes/database')

app.use(cors())

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.use(express.static(path.join(__dirname, 'Vue')));
app.use('/database', databaseRoute)

const userRoute = require('./routes/userRoute')
app.use('/user', userRoute)


app.get("/", (req, res) => {
    res.sendFile(__dirname+"/vue/index.html");// *<- ici mathieu
});

app.listen(8000,()=>{console.log("Serveur à l'écoute")})