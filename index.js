const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const render = require('koa-art-template');
const DB = require('./module/db');

const app = new Koa();
const router = new Router();

render(app,{
  root : path.join(__dirname,'view'),
  extname : '.html'
})
router.get('/',async (ctx,next)=>{
  let result = await DB.insert('tableName',{'age':121});
  ctx.body = result;
})

router.get('/find',async (ctx,next)=>{
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