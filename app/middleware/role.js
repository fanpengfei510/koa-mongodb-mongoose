module.exports = (option,app) =>{
  return async function role(ctx,next){
    if(!!ctx.session.user){
      await next()
    }else{
      return ctx.body = {
        status : 401,
        msg : '请先登录才进行操作'
      }
    }
  }
}