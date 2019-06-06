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
  async addPost(){
    const {ctx} = this;
    const data = await this.service.list.addPost();
    ctx.body = data
  }
  async myPost(){
    const {ctx} = this;
    const data = await this.service.list.myPost();
    ctx.body = data;
  }
  async delete(){
    const {ctx} = this;
    const data = await this.service.list.delete();
    ctx.body = data;
  }
}

module.exports = ListController;
