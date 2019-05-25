const Service = require('egg').Service;

class Comments extends Service{
  async send(){
    const {ctx} = this;
    const res = Object.assign(ctx.request.body,{'author':ctx.session.user._id})
    try {
      let result = await ctx.model.Comments.create(res)
      return {
        status : 200,
        msg : '评论成功',
        result
      };
    } catch (error) {
      console.log(error)
      return {
        status : 401,
        msg : '评论失败'
      };
    }
  }
}

module.exports = Comments;