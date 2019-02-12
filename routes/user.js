const User = require('../models/user')

module.exports = {
  async user(ctx,next){
    console.log(ctx.request.body)
    let user = await User.create(ctx.request.body);
    ctx.body = user;
    // ctx.set('Content-Type',"application/json")
    // ctx.body = JSON.stringify(user)
  }
}