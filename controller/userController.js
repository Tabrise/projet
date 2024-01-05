const db = require("../database/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllUser = async (req, res) => {
    const query = 'SELECT * FROM user';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des users : ' + err.stack);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }

        res.status(200).json(result);
    });
};

exports.register = async (req, res) => {
    // Vérifier si l'user existe
    const { email, mdp } = req.body;
    const result = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    console.log(result);

    // Utiliser bcrypt pour hacher le mot de passe
    const hashMDP = await bcrypt.hash(mdp, 10);

    // Envoyer les infos en base de données
    await db.query('INSERT INTO user (email, mdp) VALUES (?, ?)', [email, hashMDP]);

    // Renvoyer le token pour signature
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
};

exports.login = async(req, res)=> {
    // vérifier l'email de l'user => récupérer le mdp
    const { email, mdp} = req.body 
    const result = await db.query('select * from user where email = ?', [email])
    if(result.length == 0){
        return res.status(401).json({error: "user non existant"})
    }
    const user = result[0];
    console.log(user[0].mdp);
    console.log(user[0].role);
    // comparaison du mdp avec le mdp hasher en bdd avec bcrypt
    const SamePwd = await bcrypt.compare(mdp, user[0].mdp)
    if(!SamePwd){
        return res.status(401).json({error: "mdp incorrect"})
    }
    // renvoie jwt token pour la signature
    const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn : '1h'})
    res.json({token})
}



