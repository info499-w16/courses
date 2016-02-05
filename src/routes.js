import {default as Router} from 'koa-router'

import * as db from './db'

export const course = new Router()

course.post('/', function *(next) {
  // The body needs to have an object describing a course
  yield db.addCourse(this.request.body)
    .then(([id]) => {
      this.status = 201
      this.body = id.toString()
    })
    .catch(err => {
      this.throw(400, err)
    })
})

course.get('/:id', function *(next) {
  // Gets a course with the selected id
  yield db.getCourse(this.params.id)
    .then(course => {
      this.body = course
    })
    .catch(err => {
      this.throw(400, err)
    })
})
