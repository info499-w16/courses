import {default as Router} from 'koa-router'

export const course = new Router({
  // Prefixes the entire router with /course
  prefix: '/course'
})

course
  .post('/', function *(next) {
    this.body = this.request.body
  })
  .get('/:id', function *(next) {
    this.body = {
      'courseID': this.params.id
    }
  })
  .put('/:id', function *(next) {
    this.body
  })
  .delete('/:id', function *(next) {

  })

export const teacher = new Router({
  prefix: '/teacher'
})

teacher
  .post('/:id/courses/:courseId', function *(next) {
    this.body = {
      teacherId: this.params.id,
      courseId: this.params.courseId
    }
  })
  .get('/:id/courses', function *(next) {

  })
  .delete('/:id/courses/:courseId', function *(next) {

  })

export const student = new Router({
  prefix: '/student'
})

student
  .post('/:id/courses/:courseId', function *(next) {

  })
  .get('/:id/courses', function *(next) {

  })
  .delete('/:id/courses/:courseId', function *(next) {

  })
