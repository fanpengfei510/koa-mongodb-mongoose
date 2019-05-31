const Controller = require('egg').Controller;

class roleController extends Controller{
  async findAll(){
    const { ctx } = this;
    const data = await ctx.service.role.findAll();
    ctx.body = data
  }
  async create(){
    const {ctx} = this;
    const data = await ctx.service.role.create();
    ctx.body = data;
  }
}

module.exports = roleController