import {default as koa} from 'koa'
import {default as bodyParser} from 'koa-bodyparser'

// Get routes
import {course, teacher, student} from './routes'

import {default as heartbeat} from './heartbeat'

const app = koa()

const PORT = process.env.PORT || 3000

app
  .use(bodyParser()) // Body parsing middleware
  .use(course.routes())
  .use(teacher.routes())
  .use(student.routes())

app.listen(PORT)

// Send beat data
heartbeat()
