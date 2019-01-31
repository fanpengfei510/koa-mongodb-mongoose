var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true});
var db = mongoose.connection;

var Schema = mongoose.Schema;

var personSchema = Schema({
  _id : Schema.Types.ObjectId,
  name : String,
  age : Number,
  atories : [
    {
      type : Schema.Types.ObjectId,
      ref : 'Story'
    }
  ]
})

var storySchema = Schema({
  author : {
    type : Schema.Types.ObjectId,
    ref : 'Person',
  },
  title : String,
  fans : [
    {
      type : Schema.Types.ObjectId,
      ref : 'Person'
    }
  ]
})

var Story = mongoose.model('Story',storySchema)
var Person = mongoose.model('Person',personSchema)

db.once('open',function(err){
  if(err) return console.log(err);
  // var author = new Person({
  //   _id : new mongoose.Types.ObjectId(),
  //   name : '李四',
  //   age : 21
  // })

  // author.save(function(err){
  //   if(err) return console.log(err)
  //   var story = new Story({
  //     title : '能否突破微',
  //     author : author._id
  //   })
  //   story.save()
  // })


  Story.find({})
        .populate('author')
        .exec(function(err,story){
          console.log(story)
        })
})