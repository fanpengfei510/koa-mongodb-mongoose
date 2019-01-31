const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const CONFIG = require('./config/config')
mongoose.connect(CONFIG.mongodb,{ useNewUrlParser:true });

app.use(bodyParser())
app.keys = ['somethings']
app.use(session({
  key : CONFIG.session.key,
  maxAge : CONFIG.session.maxAge
},app))

router(app);

app.listen(3000,()=>{
  console.log('server is running at http://localhost:3000')
})