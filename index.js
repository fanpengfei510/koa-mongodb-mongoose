const Koa = require('koa');
const Router = require('koa-router');   // 路由
const path = require('path');
const render = require('koa-art-template');   // 模板引擎
const DB = require('./module/db');      // 操作数据的方法

const app = new Koa();
const router = new Router();

// 使用art-template渲染模板引擎
render(app,{
  root : path.join(__dirname,'view'),
  extname : '.html'     // 需要渲染的文件格式
})

router.get('/',async (ctx,next)=>{
  let result = await DB.insert('tableName',{'age':121});
  ctx.body = result;
})

router.get('/find',async (ctx,next)=>{
  // 查询后的数据，渲染到指定的html文件上
  let result = await DB.find('tableName',{});
  await ctx.render('index',{
    result
  })
})

router.get('/update', async (ctx,next)=>{
  let result = await DB.update('tableName',{'age':100},{'age':101});
  ctx.body = result;
})

router.get('/delete',async (ctx,next)=>{
  let result = await DB.remove('tableName',{'age':101});
  ctx.body = result;
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000,()=>{
  console.log('listent 3000')
})