const DB = require('../module/db');
const Koa = require('koa');
const axios = require('axios');
const Router = require('koa-router')();
const jwt = require('jsonwebtoken');

Router.get('/',async (ctx,next)=>{
  let result = await DB.insert('tableName',{'age':121});
  ctx.body = result;
})

Router.get('/find',async (ctx,next)=>{
  // 查询后的数据，渲染到指定的html文件上
  // let result = await DB.find('tableName',{});
  // await ctx.render('index',{
  //   result
  // })
  let token = ctx.request.header.token;
  if(token){
    jwt.verify(token,'RS256',function(err,data){
      if(err){
        ctx.body = err;
        return;
      }
      ctx.body = {status:200,msg:'token通过'}
    })
  }else{
    ctx.body = '没有token'
  }
  next()
})

Router.get('/update', async (ctx,next)=>{
  // let result = await DB.update('tableName',{'age':100},{'age':101});
  //作为中间层直接访问接口数据，并返回给客户端
  await axios.post('http://www.lovejavascript.com/resourcesFileManager/getResourcesFileList',{
    status: 1
  }).then(data=>{
    ctx.body = data.data;
  })
})

Router.get('/delete',async (ctx,next)=>{
  let result = await DB.remove('tableName',{'age':101});
  ctx.body = result;
})

Router.post('/add',async (ctx,next)=>{
  // 客户端post发送数据，接受后插入到数据库
  let result = await DB.insert('tableName',ctx.request.body)
  if(result.result.ok !== 0){
    ctx.response.body = {status:200,msg:'添加用户名密码成功'};
  }
})

Router.post('/login', async (ctx,next)=>{
  let user = ctx.request.body
  if(!user){
    console.log('请输入账户')
  } else if(user){
    var token = jwt.sign({user,iat:Math.floor(Date.now() / 1000) - 30},'RS256');
    ctx.body = {
      state:200,
      code:1,
      token
    }
  }
})

module.exports = Router.routes()