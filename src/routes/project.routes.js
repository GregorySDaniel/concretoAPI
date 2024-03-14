const { Router } = require('express')
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const projectRoutes = Router();

const ProjectController = require('../controllers/ProjectController')
const projectController = new ProjectController();

const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

projectRoutes.post('/', ensureAuthenticated, upload.array('imgs', 6), projectController.create)
projectRoutes.get('/:id', projectController.show)
projectRoutes.get('/', projectController.index)
projectRoutes.delete('/:id', ensureAuthenticated, projectController.delete)

module.exports = projectRoutes;