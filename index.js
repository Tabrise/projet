const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');
var expressLayouts = require('express-ejs-layouts');

const databaseRoute = require('./routes/database')
const modeleRoute = require('./routes/modele')
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute')
const achatRoute = require('./routes/achat')
const voitureRoute = require('./routes/voiture')

app.set('views','./views')
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(cors())
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'Vue')));
app.use('/index', modeleRoute)
app.use('/database', databaseRoute)
app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use('/achat', achatRoute)
app.use('/voiture', voitureRoute)

app.get("/",(req,res)=>{
    res.redirect('/index/')
})
app.listen(8000,()=>{console.log("Serveur à l'écoute")})