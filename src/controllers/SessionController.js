const AppError = require('../utils/AppError')
const adminUser = require('../utils/adminUser')
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionController {
  async create(req, res){
    const {name, password} = req.body;

    if(name!=adminUser.name || password!=adminUser.password){
      throw new AppError("Usuário ou senha incorreto.", 401)
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: adminUser.name,
      expiresIn
    })

    res.send({name, token})
  }

}

module.exports = SessionController; 