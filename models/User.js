const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Por favor ingrese un nombre de usuario'],
    unique: true,
    minlength: 3,
    maxlength: 40
  },
  mail: {
    type: String,
    required: [true, 'Por favor ingrese un e-mail'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Por favor ingrese un mail válido']
  },
  password: {
    type: String,
    required: [true, 'Por favor ingrese una contraseña'],
    minlength: 8,
    maxlength: 30,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Por favor confirme su contraseña'],
    validate: {
      validator: function(value){
        return value === this.password;
      },
      message: 'Las contraseñas no coinciden'
    }
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'sales'],
      message: 'El tipo de rol que ingresó no existe!'
    },
    default: 'user'
  }
})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model('User', userSchema);

module.exports = User;