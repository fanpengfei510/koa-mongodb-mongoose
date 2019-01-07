const Koa = require('koa');
const Router = require('koa-router');   // 路由
const path = require('path');
const render = require('koa-art-template');   // 模板引擎
const DB = require('./module/db');      // 操作数据的方法
const axios = require('axios');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser())
app.use(cors());

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
  // let result = await DB.find('tableName',{});
  // await ctx.render('index',{
  //   result
  // })
  await axios.post('http://www.lovejavascript.com/learnLinkManager/getLearnLinkList', {
    pluginId: 1,
  })
  .then(function (response) {
    ctx.body = response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
})

router.get('/update', async (ctx,next)=>{
  // let result = await DB.update('tableName',{'age':100},{'age':101});
  // 作为中间层直接访问接口数据，并返回给客户端
  await axios.post('http://www.lovejavascript.com/resourcesFileManager/getResourcesFileList',{
    status: 1
  }).then(data=>{
    ctx.body = data.data;
  })
})

router.get('/delete',async (ctx,next)=>{
  let result = await DB.remove('tableName',{'age':101});
  ctx.body = result;
})

router.post('/add',async (ctx,next)=>{
  // 客户端post发送数据，接受后插入到数据库
  let result = await DB.insert('tableName',ctx.request.body)
  if(result.result.ok !== 0){
    ctx.response.body = {status:200,msg:'添加用户名密码成功'};
  }
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000,()=>{
  console.log('listent 3000')
})