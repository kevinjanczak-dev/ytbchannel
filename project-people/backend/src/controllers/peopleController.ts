import { Application, Router, RouterOptions, Request as Req, Response as Res } from "express";
import { number } from "yup";
import PeopleDb from '../database/peopleDb'
import People from "../models/people";
import PeopleSchema from "../schemas/peopleSchema";

export default class PeopleController {
    peopleDb: PeopleDb

    constructor(private app: Application) {
        this.peopleDb = new PeopleDb()
        this.registerRouters()
        console.log('/people loaded')
    }

    router: Router = Router()

    async getAll(req: Req, res: Res) {
        const peoples = await this.peopleDb.getAll()
        res.status(200).send(peoples)
    }

    async add(req: Req, res: Res) {
        await this.peopleDb.add(req.body)
        res.status(204).send()
    }

    async update(req: Req, res: Res) {
        const id = Number.parseInt(req.params.id)
        await this.peopleDb.update(id, req.body)
        res.status(204).send()
    }

    async delete(req: Req, res: Res) {
        const id = Number.parseInt(req.params.id)
        await this.peopleDb.delete(id)
        res.status(204).send()
    }

    async pagination(req: Req, res: Res) {
        const page = +(req.query.page ?? 1)
        const limit = +(req.query.limit ?? 5)
        const { count, peoples } = await this.peopleDb.pagination(page, limit);
        res.header('x-total', Math.ceil(count / limit).toString())
        res.status(200).send(peoples)
    }

    registerRouters() {
        this.router.use(async (req, res, next) => {
            if(req.method !== 'GET' && req.method !== 'DELETE') {
                try {
                    await PeopleSchema.validate(req.body, {
                        abortEarly: false
                    })
                    next()
                }
                catch(err) {
                    res.status(400).send(err.errors)
                }
            }
            else
                next() 
        })
        this.router.get('/', this.getAll.bind(this))
        this.router.post('/', this.add.bind(this))
        this.router.put('/:id', this.update.bind(this))
        this.router.delete('/:id', this.delete.bind(this))
        this.router.get('/pagination', this.pagination.bind(this))
        this.app.use('/people', this.router)
    }
}