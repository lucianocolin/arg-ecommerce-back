const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config({ path: ".env" })
const connectDb = require('./config/db');

connectDb();

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/auth', authRoutes)

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
  console.log(`Servidor corriendo en el puerto ${PORT}`)
});