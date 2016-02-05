import {default as Knex} from 'knex'
import {default as rp} from 'request-promise'

import {getPylon} from './heartbeat'

export {
  createTables, addCourse, addStudent, getCourse,
  getStudents, removeStudent, getCourses
}

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

const COURSES_TABLE = 'courses'
const JUNCTION_TABLE = 'student_courses'

// Tables
function buildCourses () {
  return knex.schema.hasTable(COURSES_TABLE).then(exists => {
    if (!exists) {
      return knex.schema.createTable(COURSES_TABLE, function (table) {
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
  return knex.schema.hasTable(JUNCTION_TABLE).then(exists => {
    if (!exists) {
      return knex.schema.createTableIfNotExists(JUNCTION_TABLE, function (table) {
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

// Adds a new course to the databse
// Returns the created course's id
function addCourse (course) {
  return knex(COURSES_TABLE)
    .insert(course, 'id')
}

// Adds the student to the course
function addStudent (courseId, studentId) {
  // Check that the student exists
  rp(`${getPylon()}/users/${studentId}`)
    // 200 If exists
    .then(() => {
      // Continue now that we know the student is real
      return knex(JUNCTION_TABLE)
        .insert({
          'student_id': studentId,
          // If the course doesn't exist, this insert will fail now
          // beacuse it fails to satisfy relational constraints
          'course_id': courseId,
          'created_at': new Date()
        })
    })
    // The error can be caught later in the router if they don't exist
}

// Gets information about a course
function getCourse (courseId) {
  return knex(COURSES_TABLE)
    .first('*')
    .where('id', courseId)
}

// Gets the students assigned to a particular course
function getStudents (courseId) {
  return knex(JUNCTION_TABLE)
    // Get the ids of all the students associated with a course
    .pluck('student_id')
    .where('course_id', courseId)
    .then(ids => {
      return rp({
        method: 'POST',
        uri: `${getPylon()}/users/get-selected`,
        body: {
          ids
        },
        json: true
      })
    })
    // The id's should get mapped to an array of user objects
    .then(resp => resp.users)
}

// Removes a student from a couse
function removeStudent (courseId, studentId) {

}

// Gets all the classes that a user is a part of
function getCourses (courseId, studentId) {

}
