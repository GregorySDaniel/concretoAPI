const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

class ProjectController{
  async create(req, res){
    const {title, description, status} = req.body;

    const db = await sqliteConnection();
    
    await db.run(`INSERT INTO projects (title, description, status) VALUES (?, ?, ?)`, [title, description, status]);
    
    res.json({ title, description, status })
  }
  
  async show(req, res){
    const { id } = req.params;
    
    const db = await sqliteConnection();
    
    const project = await db.get(`SELECT * FROM projects WHERE id = (?)`, [id])
    
    res.send({project})
  }
  
  async index(req, res){
    const db = await sqliteConnection();
    
    const projects = await db.all(`SELECT * FROM projects`);
    
    res.send({projects})
  }

  async delete(req, res) {
    const { id } = req.params;

    const db = await sqliteConnection();

    await db.run('DELETE FROM projects WHERE id = ?', [id]);

    res.send('Projeto deletado com sucesso');
}
}

module.exports = ProjectController;