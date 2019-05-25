const Controller = require('egg').Controller;

class Comments extends Controller{
  async send(){
    const {ctx} = this;
    const result = await ctx.service.comments.send()
    ctx.body = result
  }
}

module.exports = Comments;