require("dotenv/config");
const express = require('express');
const db = require('./database/sqlite')
require('express-async-errors')
const AppError = require('./utils/AppError')
const uploadConfig = require("./configs/upload")

const routes = require('./routes')

const app = express();
const cors = require('cors')
app.use(cors())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(express.json())
app.use(routes)
app.use((error, request, response, next)=> {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error)
    
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

db();

const PORT = process.env.SERVER_PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
