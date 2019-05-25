const Service = require('egg').Service;

class TagService extends Service{
  async addTag(){
    const {ctx} = this;
    const body = Object.assign(ctx.request.body,{'author':ctx.session.user._id})
    try {
      let result = await ctx.model.Tag.create(body)
      return {
        status : 200,
        msg : '创建标签成功',
        result
      }
    } catch (error) {
      return {
        status : 401,
        msg : '创建标签失败',
      }
    }
  }
  async listTag(){
    const {ctx} = this;
    try {
      let result = await ctx.model.Tag.find({})
      return {
        status : 200,
        msg : '获取列表成功',
        result
      };
    } catch (error) {
      console.log(error)
      return {
        status : 401,
        msg : '获取列表失败'
      };
    }
  }
}

module.exports = TagService;