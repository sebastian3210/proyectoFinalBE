import express from "express"
import { apiRouter } from "./routers/apiRouter.js"

const app = express()

app.use('/api', apiRouter)






const server = app.listen(8080)

