import People from "../models/people";
import database from './database'

const tableName = 'peoples'

export default class PeopleDb {

    async add(people: People) {
        await database(tableName).insert(people)
    }

    async update(id: number,people: People) {
        await database(tableName).where({ id }).update(people)
    }

    async getAll() {
        const data = await database.select<People[]>('*').from(tableName)
        return data
    }

    async delete(id: number) {
        await database(tableName).where({ id }).delete()
    }

    async uniqueCpf(cpf: string) {
        return await database(tableName).where({ cpf }).select()
    }

    async pagination(page: number, limit: number) {
        
        const peoples = await database(tableName).limit(limit).offset(Math.ceil((page - 1) * limit)).select()
        const [data] = await database(tableName).count('id as CNT')

        return {
            peoples,
            count: +data.CNT
        }
    }
}