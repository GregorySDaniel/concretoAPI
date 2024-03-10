const { Router } = require('express')

const adminRoutes = require('./admin.routes')
const projectRoutes = require('./project.routes')

const routes = Router();

routes.use("/admin", adminRoutes)
routes.use("/projetos", projectRoutes)

module.exports = routes;