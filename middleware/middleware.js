const jwt = require('jsonwebtoken');
const { User } = require('../modele/User');
const db = require('../database/db');
const Cookies = require('cookies');
require('dotenv').config();

exports.authenticator = async (req, res, next) => {
    try {
        const cookies = new Cookies(req, res)
        const token = cookies.get('jwtToken');
        if (!token || !process.env.SECRET_KEY) {
            return res.status(401).json({ erreur: "Accès refusé, jeton invalide svp" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const result = await db.query('SELECT isAdmin, isComptable FROM user WHERE email = ?', {
            replacements: [decoded.email], // Utilisez un tableau avec le paramètre de l'email
            type: db.QueryTypes.SELECT
        });


        if (result.length === 0) {
            return res.status(401).json({ erreur: "Accès refusé, user introuvable" });
        }

        const user = result[0];

        if (user.isAdmin === 1 || user.isComptable === 1) {
            console.log("token:", token);
            req.user = user;
            next();
        } else {
            res.status(403).json({ erreur: 'Accès refusé, droits insuffisants' });
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ erreur: "Accès refusé, jeton invalide" });
        }
        console.error(error);
        res.status(500).json({ erreur: "Erreur interne du serveur" });
    }
};
