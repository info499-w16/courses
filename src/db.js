import {default as Knex} from 'knex'

export {createTables}

const DB_PASSWORD = process.env.DB_PASSWORD
if (!DB_PASSWORD) {
  console.log(process.env.DB_PASSWORD)
  throw new Error('DB_PASSWORD env variable not set!')
}

const knex = Knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: DB_PASSWORD,
    database: 'courses'
  }
})

// Tables
function buildCourses () {
  return knex.schema.hasTable('users').then(exists => {
    if (!exists) {
      return knex.schema.createTable('courses', function (table) {
        table.increments('id') // Creates auto-incrementing ID
        table.string('name').notNullable()
        table.text('description')
        table.string('curriculum').notNullable()
        table.integer('course_num').notNullable()
        table.string('year').notNullable()
        table.string('quarter').notNullable()
        table.integer('teacher_id').notNullable()
        table.integer('ta_id')
        table.timestamps()
      })
    }
  })
}

// Junction table
function buildStudentCourses () {
  return knex.schema.hasTable('student_courses').then(exists => {
    if (!exists) {
      return knex.schema.createTableIfNotExists('student_courses', function (table) {
        table.integer('student_id').notNullable()
        table.integer('course_id')
          .notNullable()
          .references('id')
          .inTable('courses')
        table.primary(['student_id', 'course_id'])
        table.timestamps()
      })
    }
  })
}

// Returns a function that connects to the db and creates all tables if they don't exist
function createTables () {
  return buildCourses().then(() => buildStudentCourses())
    .catch(err => {
      console.log('Uh oh, encountered db error!')
      console.log(err)
      throw err
    })
}
