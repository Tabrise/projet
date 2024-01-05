const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../database/db')
const Cookies = require('cookies')

const cookies = new Cookies(req, res)


exports.authenticator = (req, res, next) => {

    const token = req.headers.authorization === undefined ? cookies.get('token') : req.headers.authorization
    if (token && process.env.SECRET_KEY) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            // si problème => erreur
            if (err) {
                res.status(401).json({ erreur: "accès refusé " + err })
            }
            // décoder => next()
            else {
                cookies.set('email', decoded.email)
                next()
            }
        })
    } else {
        res.status(401).json({ erreur: "accès refusé" })
    }
}

exports.isAdmin = async (req, res) => {
    const email = cookies.get('email', { signed: true })
    const result = await db.query('SELECT isAdmin FROM user where email= ?', [email])
    if (result.length === 1 && (result[0].isAdmin === 1)) {
        next()
    }
    else {
        res.status(403).json({ erreur: "access denied" })
    }
}

exports.isComptable = async (req, res) => {
    const email = cookies.get('email', { signed: true })
    const result = await db.query('SELECT isComptable FROM user where email= ?', [email])
    if (result.length === 1 && (result[0].isComptable === 1)) {
        next()
    }
    else {
        res.status(403).json({ erreur: "access denied" })
    }

}