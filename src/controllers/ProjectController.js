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
  
    let isFirstImage = true;
    for (const img of imgs) {
      diskStorage.saveFile(img);
      await db.run(`INSERT INTO project_images (project_id, img, is_main) VALUES (?, ?, ?)`, [projectID, img, isFirstImage ? 1 : 0]);
      isFirstImage = false;
    }
  
    res.json({ title, description, status, adress, imgs })
  }
  
  
  async show(req, res){
    const { id } = req.params;
    
    const db = await sqliteConnection();
    
    const project = await db.get(`SELECT * FROM projects WHERE id = (?)`, [id])
    const imgs = await db.all(`SELECT img FROM project_images WHERE project_id = (?)`, [id])
    
    res.send({project, imgs})
  }
  
  async index(req, res){
    const db = await sqliteConnection();
    
    const projects = await db.all(`
      SELECT projects.*, project_images.img
      FROM projects
      INNER JOIN (
          SELECT project_id, img
          FROM project_images
          WHERE is_main = 1
      ) AS project_images ON projects.id = project_images.project_id
    `);
    
    res.send({projects})
  }
  

  async delete(req, res) {
    const { id } = req.params;

    const db = await sqliteConnection();

    const projectImages = await db.all('SELECT img FROM project_images WHERE project_id = ?', [id]);

    const diskStorage = new DiskStorage();

    for (const { img } of projectImages) {
        diskStorage.deleteFile(img);
    }

    await db.run('DELETE FROM project_images WHERE project_id = ?', [id]);
    await db.run('DELETE FROM projects WHERE id = ?', [id]);

    res.send('Projeto deletado com sucesso');
}

}

module.exports = ProjectController;