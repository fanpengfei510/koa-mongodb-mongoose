const UserSchema = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  // 注册
  async loginUp(ctx,next){
    let { username } = ctx.request.body;
    let user = await UserSchema.find({username}).exec().catch(err=>{
      ctx.throw = {status:500,err}
    })
    if(user.length === 0){
      await UserSchema.create(ctx.request.body).catch(err=>{
        console.log(err)
        ctx.throw(500,'服务器异常')
      })
      ctx.body = {
        status : 200,
        msg : '注册成功'
      }
    }else{
      ctx.body = {
        status : 0,
        msg : '该用户已注册过'
      }
    }
  },

  // 登录
  async loginIn(ctx,next){
    console.log(ctx.request.body)
    let {username,password} = ctx.request.body;
    let user = await UserSchema.findOne({username}).exec();
    if(!!user){
      if(user.password == password){
        let token = jwt.sign(
          {data : {username,password}},
          'RS256',
          {expiresIn: '24h'}
        )
        console.log(token)
        ctx.body = {
          status : 200,
          msg : '登录成功',
          token
        }
      }else{
        ctx.body = {
          status : 0,
          msg : '密码错误'
        }
      }
    }else{
      ctx.body = {
        status : 0,
        mes : '该用户不存在'
      }
    }
  }
}