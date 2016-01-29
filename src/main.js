import {default as koa} from 'koa'
import {default as koaRouter} from 'koa-router'

const app = koa()
const router = koaRouter()

const PORT = process.env.PORT || 3000

router.get('/', function *(next) {
  this.body = 'Hello World!'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT)
