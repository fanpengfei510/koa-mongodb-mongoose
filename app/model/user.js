module.exports = app =>{
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username : {
      type : String,
      required : true
    },
    password : {
      type : String,
      required :true
    },
    role : {
      type : Schema.Types.Object,
      ref : 'Role'
    },
    isAdmin : {
      type : Boolean,
      default : false
    },
    email : String
  })

  return mongoose.model('User',UserSchema,'user')
}