const { Router } = require('express')

const projectRoutes = Router();

const ProjectController = require('../controllers/ProjectController')
const projectController = new ProjectController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

projectRoutes.post('/', ensureAuthenticated, projectController.create)
projectRoutes.get('/:id', projectController.show)
projectRoutes.get('/', projectController.index)
projectRoutes.delete('/:id', ensureAuthenticated, projectController.delete)

module.exports = projectRoutes;