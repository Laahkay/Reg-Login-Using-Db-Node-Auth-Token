var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});
// UserSchema.methods.compare =(password).then(validPass => {
//    // validPass returns true or false
//    return validPass(password,hash)
//  }).catch(err => console.log('error: ' + err));
UserSchema.methods.comparePassword = async(password)=> {
   try {
      return bcrypt.compareSync(password, this.hash_password);
      
   } catch (error) {
      return error
   }
};

mongoose.model('User', UserSchema);