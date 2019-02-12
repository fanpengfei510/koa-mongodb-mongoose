const Koa = require('koa');
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa();
const router = require('./routes')
const CONFIG = require('./config/config');

mongoose.connect(CONFIG.mongodb,{useNewUrlParser : true})

app.use(cors())
app.use(bodyParser())
router(app)
app.listen(3000,()=>{
  console.log('server is running at http://localhost:3000')
})