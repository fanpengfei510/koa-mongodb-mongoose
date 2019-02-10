/**
|--------------------------------------------------
| @class 分类
|--------------------------------------------------
*/
const CategoryModel = require('../models/category');

module.exports = {
  // 分类列表
  async list(ctx,next){
    const categories = await CategoryModel.find({});
    ctx.body = categories
  },

  // 创建分类
  async create(ctx,next){
    console.log(ctx)
    await CategoryModel.create(ctx.request.body);
    ctx.body = {state:200,msg:'成功'}
  }
}