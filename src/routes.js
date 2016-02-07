import {default as Router} from 'koa-router'

import * as db from './db'

export const course = new Router()

course.post('/', function *(next) {
  // The body needs to have an object describing a course
  try {
    const [id] = yield db.addCourse(this.request.body)
    this.status = 201
    this.body = id.toString()
  } catch (err) {
    this.throw(400, err)
  }
})

course.get('/:id', function *(next) {
  // Gets a course with the selected id
  try {
    this.body = yield db.getCourse(this.params.id)
  } catch (err) {
    this.throw(400, err)
  }
})
