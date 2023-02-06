const Product = require('../models/Product');

const getProducts = async(req, res) =>{
  try {
    const products = await Product.find({});
    return res.status(200).json({ ok: true, products })
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
};

const createProduct = async(req, res) =>{
  try {
    const newProduct = new Product({ ...req.body });
    const savedProduct = await newProduct.save();
    return res.status(201).json({ ok:true, savedProduct })
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
};

const getProductById = async(req, res) =>{
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.status(200).json({ ok: true, product })
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
};

const deleteProduct = async(req, res) =>{
  try {
    await Product.findByIdAndDelete(req.params.id)
    return res.status(200).json({ ok: true, message: 'Producto removido exitosamente' })
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct
};