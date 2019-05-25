'use strict';

const Controller = require('egg').Controller;

class ListController extends Controller {
  async getList() {
    const { ctx } = this;
    const data = await this.service.list.create()
    ctx.body = data;
  }
  async details(){
    const {ctx} = this;
    let id = await ctx.query.id
    const data = await this.service.list.details(id);
    ctx.body = data
  }
}

module.exports = ListController;
