const MenuSchema = require('../models/menu');
const mongoose = require('mongoose')

module.exports = {
  async addMenu(ctx,next){
    let { title,menu_id,href } = ctx.request.body;
    try {
      if(menu_id){
        await MenuSchema.updateOne(
          { _id : mongoose.Types.ObjectId(menu_id)},
          { $push : {children : { id : mongoose.Types.ObjectId(),title,href }} }
          )
      }else{
        await MenuSchema.create(ctx.request.body,function(err,data){
          console.log(data)
        })
      }
      ctx.body = {msg : "添加成功"}
    } catch (error) {
      ctx.body =  {msg : "添加失败"}
    }
  }
}