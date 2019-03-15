const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const CONFIG = require('./config/config')
const router = require('./router')
const bodyParser = require('koa-bodyparser');
const Send = require('./utils/Send');
const Error = require('./utils/Error');
const jwtKoa = require('koa-jwt');
mongoose.connect(CONFIG.mongodb,{ useNewUrlParser : true})

app.use(bodyParser())
app.use(Send())
app.use(Error.renderError).use(jwtKoa(CONFIG.secret).unless({
  path : [/^\/api\/user\/loginin/] 
}))
router(app)

app.listen(CONFIG.prot,()=>{
  console.log(`listen port ${CONFIG.prot}`)
})