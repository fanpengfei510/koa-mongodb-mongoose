const Router = require('koa-router');   // 路由
const cors = require('koa2-cors');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const router = new Router();

app.use(bodyParser())


const admin = require('./router/admin');
app.use(cors());
router.use('/admin',admin)
<<<<<<< HEAD

router.post('/login',async (ctx,next)=>{
  let { user,password } = ctx.request.body;
  let result = await DB.find('tableName',{'user' : user});
  if(result.length !== 0){
    ctx.response.body = {status:200,msg:'登陆成功'};
  }else{
    ctx.response.body = {status:0,msg:'账号密码错误'};
  }
})
=======
>>>>>>> d42c1252cc3ebdc06ae108974c785e38a7e1cbd1

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,()=>{
  console.log('listent 3000')
})