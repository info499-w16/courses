import {default as Knex} from 'knex'

const DB_PASSWORD = process.env.DB_PASSWORD
if (!DB_PASSWORD) {
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
}).catch(err => {
  console.log('Could not connect to database, please check connection settings')
  throw err
})

// Tables
function buildCourses () {
  return knex.schema.createTableIfNotExists('courses', function (table) {
    table.increments() // Creates auto-incrementing ID
    table.string('name')
    table.text('description')
    table.string('curriculum')
    table.int('courseNum')
    table.string('year')
    table.string('quarter')
    table.timestamps()
  })
}

function buildStudents () {
  return knex.schema.createTableIfNotExists('students', function (table) {
    table.string('id').unique().notNullable().primary()
    table.timestamps()
  })
}

function buildTeachers () {
  return knex.schema.createTableIfNotExists('teachers', function (table) {
    table.string('id').unique().notNullable().primary()
    table.timestamps()
  })
}

// Junction tables

// For determining what courses a student has and vice versa
function buildStudentCourses () {
  return knex.schema.createTableIfNotExists('studentCourses', function (table) {
    table.string('studentId').notNullable().references('students.id')
    table.string('courseId').notNullable().references('courses.id')
    table.primary(['studentId', 'courseId'])
  })
}

// For determining what courses a teacher has
function buildTeacherCourses () {
  return knex.schema.createTableIfNotExists('teacherCourses', function (table) {
    table.string('studentId').notNullable().references('students.id')
    table.string('courseId').notNullable().references('courses.id')
    table.primary(['studentId', 'courseId'])
  })
}

// Returns a function that connects to the db and creates all tables if they don't exist
function createTables () {
  return knex
    .then(() => {
      return Promise.all([buildCourses(), buildTeachers(), buildStudents()])
    })
    .then(() => {
      // Junction tables have to be created AFTER the main tables
      return Promise.all([buildStudentCourses(), buildTeacherCourses()])
    })
    .catch(err => {
      console.log('Uh oh, encountered db error!')
      throw err
    })
}
