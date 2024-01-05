const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('raudi','root','',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('authentification réussit')
}).catch((err)=>{
    console.log(err);
})

module.exports = sequelize