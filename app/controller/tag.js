const Controller = require('egg').Controller;

class TagController extends Controller{
  async addTag(){
    let result = await this.ctx.service.tag.addTag();
    this.ctx.body = result;
  }
  async listTag(){
    let result = await this.ctx.service.tag.listTag();
    this.ctx.body = result;
  }
}

module.exports = TagController;