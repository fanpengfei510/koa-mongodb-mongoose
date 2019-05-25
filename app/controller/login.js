const Controller = require('egg').Controller;

class loginController extends Controller{
  async index(){
    const { ctx } = this;
    const { username,password } = ctx.request.body
    const result = await ctx.service.login.index(username,password)
    ctx.body = result
  }
  async outLogin(){
    const {ctx} = this;
    const result = await ctx.service.login.outLogin();
    ctx.body = result
  }
  async loginUp(){
    const { ctx } = this;
    const body = ctx.request.body;
    const result = await ctx.service.login.loginUp(body);
    ctx.body = result;
  }
}

module.exports = loginController