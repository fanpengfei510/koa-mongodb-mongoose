module.exports = app =>{
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoelSchema = new Schema({
    name : {
      type : String,
      required : true,
      unique : true
    },
    access : {
      type : String,
      required : true,
      default : 'user'
    },
    extra : {
      type : mongoose.Schema.Types.Mixed
    }
  })
  return mongoose.model('Role',RoelSchema,'role')
}