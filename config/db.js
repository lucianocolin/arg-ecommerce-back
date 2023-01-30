const mongoose = require('mongoose');
require('dotenv').config({ path: ".env" });

mongoose.set('strictQuery', false);

const connectDb = async() =>{
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.log('Ha ocurrido un error', error);
    process.exit(1);
  }
};

module.exports = connectDb;