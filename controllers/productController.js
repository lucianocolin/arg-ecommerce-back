
let products = [
  {id: 1, name: 'Remera', price: 6000},
  {id: 2, name: 'Pantalon', price: 12000},
  {id: 3, name: 'Campera', price: 25000}
];

getProducts = (req, res) =>{
  return res.status(200).json({ ok: true, products })
};

getProductById = (req, res) =>{
  const { id } = req.params;
  const product = products.find( productToFind => productToFind.id === Number(id) );
  return res.status(200).json({ ok: true, product } )
};

createProduct = (req, res) =>{
  products.push( {...req.body} )
  return res.status(201).json({ ok: true, ...req.body })
}

updateProduct = (req, res) =>{
  const { id } = req.params;
  products = products.map(product => product.id === Number(id) ? {...req.body} : product);
  return res.status(200).json({ ok: true, product: req.body });
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct
};