const Service = require('egg').Service;

class RoleService extends Service{
  async findAll(){
    const {ctx} = this;
    const data = await ctx.model.Role.find({});
    return {
      status : 200,
      msg : '查询成功',
      data
    };
  }
  async create(){
    const {ctx} = this;
    try {
      console.log(ctx.request.body)
      const data = await ctx.model.Role.create(ctx.request.body)
      return {
        status : 200,
        msg : '创建成功',
        data
      };
    } catch (error) {
      return {
        status : 401,
        msg : '创建失败',
      };
    }
  }
}

module.exports = RoleService