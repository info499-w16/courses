import {default as Router} from 'koa-router'

export {course, teacher, student}

const course = new Router({
  // Prefixes the entire router with /course
  prefix: '/course'
})

course
  .post('/', function *(next) {

  })
  .get('/:id', function *(next) {

  })
  .put('/:id', function *(next) {

  })
  .delete('/:id', function *(next) {

  })

const teacher = new Router({
  prefix: '/teacher'
})

teacher
  .post('/:id/courses/:courseId', function *(next) {

  })
  .get('/:id/courses', function *(next) {

  })
  .delete('/:id/courses/:courseId', function *(next) {

  })

const student = new Router({
  prefix: '/student'
})

student
  .post('/:id/courses/:courseId', function *(next) {

  })
  .get('/:id/courses', function *(next) {

  })
  .delete('/:id/courses/:courseId', function *(next) {

  })
