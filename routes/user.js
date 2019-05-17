const User = require('../model/user');
module.exports = {
  async user(ctx,next){
    let user = ctx.request.body;
    try {
      let data = await User(user).save();
      ctx.response.status = 200;
      ctx.response.body = {
        status : 200,
        msg : '创建成功',
        data
      }
    } catch (error) {
      ctx.response.body = {
        status : error.code ? 0 : 401,
        msg : error.message,
      }
    }
  },
  async login(ctx,next){
    let { username,password } = ctx.request.body;
    let data = await User.findOne({username,password})
    if(data && data.username){
      ctx.response.body = {
        status : 200,
        msg : '登录成功',
      }
      ctx.session.user = {
        id : data._id,
        username : data.username,
        isAdmin : data.isAdmin
      }
    }else{
      ctx.response.body = {
        status : 0,
        msg : '登录失败',
      }
    }
  },
  async outLogin(ctx,next){
    ctx.session.user = null;
    ctx.response.body = {
      status : 200,
      msg : "退出登录成功"
    }
  }
}