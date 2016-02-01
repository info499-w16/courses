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
  return knex.schema.createTableIfNotExists('courses', function (table) {
    table.increments('id') // Creates auto-incrementing ID
    table.string('name')
    table.text('description')
    table.string('curriculum')
    table.integer('courseNum')
    table.string('year')
    table.string('quarter')
    table.timestamps()
  })
}

function buildStudents () {
  return knex.schema.createTableIfNotExists('students', function (table) {
    table.increments('id')
    table.string('googleId').unique().notNullable()
    table.timestamps()
  })
}

function buildTeachers () {
  return knex.schema.createTableIfNotExists('teachers', function (table) {
    table.increments('id')
    table.string('googleId').unique().notNullable()
    table.timestamps()
  })
}

// Junction tables

// For determining what courses a student has and vice versa
function buildStudentCourses () {
  return knex.schema.createTableIfNotExists('studentCourses', function (table) {
    table.integer('studentId').notNullable().references('students.id')
    table.integer('courseId').notNullable().references('courses.id')
    table.primary(['studentId', 'courseId'])
  })
}

// For determining what courses a teacher has
function buildTeacherCourses () {
  return knex.schema.createTableIfNotExists('teacherCourses', function (table) {
    table.integer('teacherId').notNullable().references('teachers.id')
    table.integer('courseId').notNullable().references('courses.id')
    table.primary(['teacherId', 'courseId'])
  })
}

// Returns a function that connects to the db and creates all tables if they don't exist
function createTables () {
  return Promise.all([buildCourses(), buildTeachers(), buildStudents()])
    .then(() => {
      // Junction tables have to be created AFTER the main tables
      return Promise.all([buildStudentCourses(), buildTeacherCourses()])
    })
    .catch(err => {
      console.log('Uh oh, encountered db error!')
      console.log(err)
      throw err
    })
}
