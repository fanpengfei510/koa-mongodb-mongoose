const Router = require('koa-router');   // 路由
const cors = require('koa2-cors');
const Koa = require('koa');
const app = new Koa();
const router = new Router();

const admin = require('./router/admin');
app.use(cors());
router.use('/admin',admin)

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,()=>{
  console.log('listent 3000')
})