const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const DiskStorage = require('../providers/diskStorage')

class ProjectController{
  async create(req, res){
    const {title, description, adress, status} = req.body;
    const imgs = req.files ? req.files.map(file => file.filename) : [];

    const diskStorage = new DiskStorage();
    const db = await sqliteConnection();

    const { lastID: projectID } = await db.run(`INSERT INTO projects (title, description, status, adress) VALUES (?, ?, ?, ?)`, [title, description, status, adress]);

    for (const img of imgs) {
      diskStorage.saveFile(img);
      await db.run(`INSERT INTO project_images (project_id, imagem) VALUES (?, ?)`, [projectID, img]);
    }
    
    res.json({ title, description, status, adress, imgs })
  }
  
  async show(req, res){
    const { id } = req.params;
    
    const db = await sqliteConnection();
    
    const project = await db.get(`SELECT * FROM projects WHERE id = (?)`, [id])
    const imgs = await db.all(`SELECT (imagem) FROM project_images WHERE project_id = (?)`, [id])
    
    res.send({project, imgs})
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