const MenuSchema = require('../models/menu');
const mongoose = require('mongoose')

module.exports = {
  // 添加应用与菜单
  async add(ctx,next){
    let { title,appId,href } = ctx.request.body;
    try {
      if(appId){
        await MenuSchema.updateOne(
          { _id : mongoose.Types.ObjectId(appId)},
          { $push : {children : { appId : mongoose.Types.ObjectId(),title,href }} }
          )
      }else{
        await MenuSchema.create(ctx.request.body).catch(err=>{
          ctx.thorw(500,err)
        })
      }
      ctx.body = {status : 200,msg : "添加成功"}
    } catch (error) {
      ctx.body =  {status : 0,mmsg : "添加失败"}
    }
  },
  // 应用与菜单列表
  async applist(ctx,next){
    try {
      let data = await MenuSchema.find();
      ctx.body = {status : 200,data}
    } catch (error) {
      ctx.body =  {status : 0}
    }
  }
}