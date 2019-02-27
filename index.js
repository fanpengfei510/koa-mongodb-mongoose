const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const CONFIG = require('./config/config')
const router = require('./router')
const bodyParser = require('koa-bodyparser');
const Send = require('./utils/Send');
const Error = require('./utils/Error');
const jwtKoa = require('koa-jwt')
mongoose.connect(CONFIG.mongodb,{ useNewUrlParser : true})

<<<<<<< HEAD
app.use(bodyParser())
app.use(Send())
app.use(Error.renderError).use(jwtKoa(CONFIG.secret).unless({
  path : [/^\/api\/user\/loginin/] 
}))
router(app)

app.listen(CONFIG.prot,()=>{
  console.log(`listen port ${CONFIG.prot}`)
=======
const admin = require('./router/admin');
app.use(cors());
router.use('/admin',admin)

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,()=>{
  console.log('listent 3000')
>>>>>>> 16b013b00852324136006971c4c6ef30d9347103
})