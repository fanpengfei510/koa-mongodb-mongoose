/**
|--------------------------------------------------
| 子文档的创建
|--------------------------------------------------
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true});

var db = mongoose.connection;
var Schema = mongoose.Schema;

var childSchema = new Schema({name:'string'})
var parentSchema = new Schema({
  children : [childSchema],
  child : childSchema
})

var Parent = mongoose.model('Parent',parentSchema);

db.once('open',function(){
  var parent = new Parent(
    {
      children:[
        {name:'matt'},
        {name:'Sarah'}
      ]
    }
  )
  var parent = new Parent({
    children : [{id:Schema.Types.ObjectId,name:'invalid'}]
  })
  parent.save(function(err){
    console.log(err.message)
  })
  childSchema.pre('save',function(next){
    if('invalid' == this.name){
      return next(new Error('#sadpanda'))
    }
    console.log('1')
    next()
  })

  var doc = parent.children.id
  console.log(doc)
})