const db = require("../database/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modele/User')
const Cookies = require('cookies')

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

exports.createUser = async (req, res) => {
    try {
        const newUser = req.body;
        await User.create(newUser);
        res.status(200).json('Utilisateur créé avec succès');
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json('Erreur lors de la création de l\'utilisateur');
    }
};

exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, password} = req.body;
        var cookies = new Cookies(req, res)
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: "L'utilisateur existe déjà" });
        }

        // Utiliser bcrypt pour hacher le mot de passe
        const hashMDP = await bcrypt.hash(password, 10);

        // Envoyer les informations en base de données
        await User.create({
            nom : nom,
            prenom: prenom,
            email: email,
            mdp: hashMDP,
        });

        // Renvoyer le jeton pour l'authentification
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.redirect('/')
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const cookies= new Cookies(req,res)
        // Recherche de l'utilisateur par email dans la base de données
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user)
            return res.status(401).json({ error: "Utilisateur non existant" });
        // Comparaison du mot de passe avec celui stocké en base de données avec bcrypt
        const samePwd = await bcrypt.compare(password, user.mdp);
        if (!samePwd)
            return res.status(401).json({ error: "Mot de passe incorrect" });
        // Renvoie du jeton JWT pour l'authentification
        const token = jwt.sign({ 'email':email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        cookies.set('jwtToken',token)
        res.redirect('/')

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};