const { Router } = require('express')

const projectRoutes = Router();

const ProjectController = require('../controllers/ProjectController')
const projectController = new ProjectController();

projectRoutes.post('/', projectController.create)
projectRoutes.get('/:id', projectController.show)
projectRoutes.get('/', projectController.index)
projectRoutes.delete('/:id', projectController.delete)

module.exports = projectRoutes;