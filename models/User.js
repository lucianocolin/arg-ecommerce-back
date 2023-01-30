const { Schema, model } = require('mongoose');

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
    validate: {
      validator: function(mail){
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailRegex.test(mail);
      },
      message: 'El mail no es válido'
    }
  },
  password: {
    type: String,
    required: [true, 'Por favor ingrese una contraseña'],
    minlength: 8,
    maxlength: 30
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

const User = model('User', userSchema);

module.exports = User;