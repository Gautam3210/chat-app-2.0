const express = require('express')
const { userSignUp, userLogin } = require('../controllers/signController')

const signRoute = express.Router()


signRoute.post('/', userSignUp);
signRoute.post('/login', userLogin);

module.exports = {
  signRoute
}