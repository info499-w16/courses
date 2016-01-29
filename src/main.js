import {default as koa} from 'koa'
import {default as koaRouter} from 'koa-router'
import {default as bodyParser} from 'koa-bodyparser'

const app = koa()
const router = koaRouter()

const PORT = process.env.PORT || 3000

router.get('/', function *(next) {
  this.body = 'Hello World!'
})

app
  .use(bodyParser()) // Body parsing middleware
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT)
