const express = require('express');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/products', productsRoutes);

app.listen('4000', ()=>{
  console.log('Servidor corriendo en el puerto 4000')
});