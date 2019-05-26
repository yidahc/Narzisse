const mongoose = require('mongoose');
require('dotenv').config();
/*
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)
*/
const bcrypt = require('bcrypt'); // used to hash passwords
const jwt = require('jsonwebtoken'); // used to generate tokens
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1 // only one user per email, 1 is for true
    },
    password: {
      type: String,
      required: true,
      minLength: 5 // password must be a string at least 5 characters long and is required
    },
    name: {
      type: String,
      required: true,
      maxLength: 100 // name & last name must be a string with max 100 characters and is required
    },
    lastname: {
      type: String,
      required: true,
      maxLength: 100
    },
    cart: {
      type:Array,
      default:[] // generate empty cart  & shopping history for new user, 
    }, // will push items into it later on
    history: {
      type:Array,
      default:[] 
    },
    role: {
      type: Number,
      default: 0 // either you are an administrator or a user
    }, // 0 is for user and that is the default for any new account
    token: {
      type: String 
    }
  });
  
  userSchema.pre('save', function(next){ 
    // next is function in server/config that will run after this function (cb)
    var user = this; 
    //es5 requires us to bind 'this' to the instance of User that we are running this callback on
    if(user.isModified('password')){ 
      //isModified is a mongo method for when a user is trying to modify something
      bcrypt.genSalt(SALT_I, function(err, salt){ // generating hash for user password
        if (err) return next(err); // if error, continue to next function with err as parameter
        bcrypt.hash(user.password, salt, function(err, hash){ 
          //with es6, one would write "this.password" and "this.isModified"
          if (err) return next(err); // next function will return "success: false"
          user.password = hash; // generating hash for user password
          next(); // continue to next function
        });
      });
    } else {
      next() // if they are modifying their password, we regenerate a hash, else we move to next function
    }
  });

  userSchema.methods.comparePassword = function (candidatePassword, cb){
    //creating a new mongo method to compare user passwords
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){ // bcrypt method to compare passwords
      if (err) return cb(err);
      cb(null, isMatch)
      // isMatch returns a boolean
    })
  }

  userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET)
   // .sign (to create token/hash of something) and .toHexString (to make something into string) are jwt methods
    user.token = token;
    // saving response from jwt to database
    user.save(function(err, user){
      if(err) return cb(err);
      cb(null, user);
    })
  }

  userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    jwt.verify(token, process.env.SECRET, function(err, decode) { //.verify is method from jwt
    // if we get the decoded id it means the user is valid
      user.findOne({"_id":decode, "token":token}, function (err, user) {
        if (err) return cb(err);
        cb (null, user);
      })
    })
  }

  const User = mongoose.model('User', userSchema);
  module.exports= { User }
  

  /*
  sample response from server for new user with hashed password:
  {
    "success": true,
    "userdata": {
        "__v": 0, // automatically generated by mongo
        "email": "yidah@gmail.com",
        "password": "$2b$10$KjTi5kxJ5p2StIKfO8V6R./Tn7gTIyLF0QIwnxLdBCP/OyG4n3wxW", // automatically generated by bcrypt
        "name": "yidah",
        "lastname": "curiel",
        "_id": "5ce0add2a9882b700b81516e", // automatically generated by mongo
        "role": 0,
        "history": [],
        "cart": []
    }
}
*/