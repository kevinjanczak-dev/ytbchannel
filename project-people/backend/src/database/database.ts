import knex from 'knex'

export default knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '06051997',
      database : 'kevin_ytb'
    }
})


