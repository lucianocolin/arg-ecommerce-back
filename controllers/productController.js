const Products = require('../models/Product');

const getProducts = async(req, res) =>{
  try {
    const products = await Products.find({});
    return res.status(200).json({ ok: true, products })
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
};

const createProduct = async(req, res) =>{
  try {
    const newProduct = new Products({ ...req.body });
    const savedProduct = await newProduct.save();
    return res.status(201).json({ ok:true, savedProduct })
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
};

const getProductById = async(req, res) =>{
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    return res.status(200).json({ ok: true, product })
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById
};