module.exports = (option,app) =>{
  return async function role(ctx,next){
    ctx.state.csrf = ctx.csrf;
    await next()
  }
}