const fs = require("fs");
const PRODUCTS = require("../data/product.json");

function getProducts(req, res) {
  res.status(200).json(ROBOTS);
}

function getProductById(req, res) {
  const { id } = req.params;

  const product = PRODUCTS.find((product) => {
    return product.id === id;
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
    return product.id === id;
  });

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);

  fs.writeFileSync("./data/product.json", JSON.stringify(products));
  res.status(200).json({ message: "Item deleted" });
}

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
};