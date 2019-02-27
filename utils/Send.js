function Send () {
  let render = ctx =>{
    return (data,msg) => {
      ctx.set("Content-Type", "application/json");
      ctx.body = {
        state : 200,
        msg : msg || 'success',
        data : data || {}
      }
    }
  }
  let renderError = ctx =>{
    return msg => {
      ctx.set("Content-Type","application/json");
      ctx.body = {
        state : 0,
        msg : msg.toString()
      }
    }
  }

  return async(ctx,next)=>{
    ctx.render = render(ctx)
    ctx.renderError = renderError(ctx)
    await next()
  }
}
module.exports = Send;