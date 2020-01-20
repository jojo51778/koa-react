const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const views = require('koa-views')
const historyApiFallback = require('koa-history-api-fallback')

const index = require('./routes/index')
const users = require('./routes/users')

// 错误监控
onerror(app)

// 中间件
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(views(__dirname, +'/public/build'))

// 请求日志时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 开发环境跨域解决
app.use(cors())

// 路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

//一定要写在路由后面，写在前面就不会返回接口内容，而是直接返回首页了
app.use(historyApiFallback()); // 在这个地方加入。一定要加在静态文件的serve之前，否则会失效。
app.use(require('koa-static')(__dirname + '/public/build'))

// 错误
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})

module.exports = app