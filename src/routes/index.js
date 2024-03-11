const { Router } = require('express')

const projectRoutes = require('./project.routes')
const sessionRoutes = require('./session.routes')

const routes = Router();

routes.use("/projetos", projectRoutes)
routes.use("/session", sessionRoutes)

module.exports = routes;