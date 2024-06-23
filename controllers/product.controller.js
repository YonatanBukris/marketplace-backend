const fs = require("fs");
const PRODUCTS = require("../data/products.json");

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function getProducts(req, res) {
  res.status(200).json(PRODUCTS);
}

function getProductById(req, res) {
  const { id } = req.params;

  const product = PRODUCTS.find((product) => {
    return product._id === id;
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
}

function deleteProduct(req, res) {
  const { id } = req.params;

  const products = [...PRODUCTS];
  const productIndex = products.findIndex((product) => {
    return product._id === id;
  });

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);

  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
  res.status(200).json({ message: "Product deleted" });
}

function createProduct(req, res) {
  const newProduct = req.body;

  // Validate request body
  if (!newProduct.name || !newProduct.price || !newProduct.category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Generate ID for the new product
  newProduct._id = generateId();

  PRODUCTS.push(newProduct);
  fs.writeFileSync("./data/products.json", JSON.stringify(PRODUCTS, null, 2));

  res.status(201).json(newProduct);
}

function updateProduct(req, res) {
  const { id } = req.params;
  const updatedProduct = req.body;

  // Find the index of the product in the array
  const productIndex = PRODUCTS.findIndex((product) => product._id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Update the product in the array
  PRODUCTS[productIndex] = { ...PRODUCTS[productIndex], ...updatedProduct };

  // Write the updated array back to the file
  fs.writeFileSync("./data/products.json", JSON.stringify(PRODUCTS, null, 2));

  res.status(200).json(PRODUCTS[productIndex]);
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};