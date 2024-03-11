const { Router } = require('express')

const adminRoutes = require('./admin.routes')
const projectRoutes = require('./project.routes')
const sessionRoutes = require('./session.routes')

const routes = Router();

routes.use("/admin", adminRoutes)
routes.use("/projetos", projectRoutes)
routes.use("/session", sessionRoutes)

module.exports = routes;