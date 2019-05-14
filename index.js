const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const router = require('./routes');
const CONFIG = require('./config');
const Error = require('./utlis')
const koaJwt = require('koa-jwt')
const session = require('koa-session');
const koaBody = require('koa-body');
mongoose.connect(CONFIG.mongodb,{useNewUrlParser: true});

// app.use(Error.renderError).use(koaJwt(CONFIG.secret).unless({
//   path : [/^\/api\/post\/user/]
// }))

app.keys = ['somethings']
app.use(session({
  key : CONFIG.session.key,
  maxAge : CONFIG.session.maxAge
},app))

app.use(koaBody({
  multipart : true,
  formidable : {
    maxFieldsSize : 200 * 1024 * 1024
  }
}))

router(app)

app.listen(CONFIG.prot,()=>{
  console.log(`listen pro ${CONFIG.prot}`)
})