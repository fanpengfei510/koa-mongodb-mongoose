const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const CONFIG = require('./config/config')
const path = require('path')
const router = require('./router')
// const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body')
const Send = require('./utils/Send');
const Error = require('./utils/Error');
const jwtKoa = require('koa-jwt');
mongoose.connect(CONFIG.mongodb,{ useNewUrlParser : true})

// app.use(bodyParser())
app.use(koaBody({
  multipart : true,
  formidable : {
    // uploadDir : path.join(__dirname,'file'),
    // keepExtensions : true,
    maxFileSize : 200 * 1024 * 1024,
  }
}))
app.use(Send())
// app.use(Error.renderError).use(jwtKoa(CONFIG.secret).unless({
//   path : [/^\/api\/post\/loginup/,/^\/api\/post\/loginin/] 
// }))
router(app)

app.listen(CONFIG.prot,()=>{
  console.log(`listen port ${CONFIG.prot}`)
})