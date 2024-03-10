const { Router } = require('express')

const adminRoutes = Router();

const AdminController = require('../controllers/AdminController')
const adminController = new AdminController();

adminRoutes.post('/', adminController.login)

module.exports = adminRoutes;