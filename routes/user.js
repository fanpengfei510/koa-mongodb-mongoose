const UserModel = require('../models/user');

module.exports = {
  async signup(ctx,next){
    let { name,email } = ctx.request.body;
    let result = await UserModel.findOne({name,email});
    if(result == null){
      await UserModel.create(ctx.request.body);
      ctx.body = {
        state : 200,
        msg : '注册成功'
      };
    }else{
      ctx.body = {
        state : 0,
        msg : '注册失败，已存在用户名'
      };
    }
  },
  async signin(ctx,next){
    let { name,password } = ctx.request.body;
    let result = await UserModel.findOne({name,password});
    if(result && password){
      ctx.session.user = {
        _id : result._id,
        name : result.name,
        isAdmin : result.isAdmin,
        email : result.email
      }
      ctx.body = {
        state : 200,
        msg : '登录成功',
        result
      };
    }else{
      ctx.body = {
        state : 0,
        msg : '登录失败'
      };
    }
  },
  async signout(ctx,next){
    ctx.session = null;
    ctx.body = {
      state : 200,
      msg : '退出登录'
    }
    console.log(ctx.session)
  }
}