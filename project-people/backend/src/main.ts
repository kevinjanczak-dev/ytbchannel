import express, { Application, json } from 'express'
import cors from 'cors'
import PeopleController from './controllers/peopleController'
import PeopleSchema from './schemas/peopleSchema'

async function bootstrap() {
    const port = 8500
    const app: Application = express()

    function middlewares() {
        app.use(cors({
            exposedHeaders: ['x-total'],
            origin(origin, callback) {
                callback(null, true)
            }
        }))
        app.use(json())
    }

    function initializeControllers() {
        new PeopleController(app)
    }
    
    middlewares()
    initializeControllers()

    app.listen(port, () => {
        console.log('this server has been started on port '+ port)
    })
}

(async () => await bootstrap() )()

