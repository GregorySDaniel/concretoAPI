const AppError = require('../utils/AppError')

class AdminController{
  login(req, res){
    const {name, password} = req.body;
    if(!name) {
      throw new AppError("Deve inserir o nome do usuário")
    }
    res.json({ name, password })
  }
}

module.exports = AdminController;