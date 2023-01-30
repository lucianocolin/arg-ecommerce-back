const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: [true, 'Por favor indique la marca del producto']
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria']
  },
  price: {
    type: Number,
    required: [true, 'Se debe indicar el precio']
  },
  description: {
    type: String,
    required: [true, 'Se debe colocar una descripción del producto'],
    maxlength: 300
  },
  stock: {
    type: Number,
    required: [true, 'Por favor indicar la cantidad en stock'],
    default: 0
  },
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

productSchema.pre('save', function(next){
  this.slug = slugify(this.name, { lower: true })
  next();
})

module.exports = model('Products', productSchema);