import Product from "../models/productModel.js";

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    if (products) {
      return res.json(products);
    } else {
      return res.status(404).json({ message: "Products not found!" });
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getOneProduct(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Id is not provided" });
  }
  try {
    const product = await Product.findById(id);
    if (product) {
      return res.json(product);
    } else {
      return res
        .status(404)
        .json({ message: `Product with the id ${id} is not found!` });
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProduct(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Id is not provided" });
  }
  try {
    await Product.findByIdAndDelete(id);
    return res.json({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
  }
}
export async function updateProduct(req, res) {
  const data = req.body;
  const { id } = req.body;
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, { ...data });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
}
export async function createProduct(req, res) {
  const data = req.body;
  const image = req.file?.pathname;

  try {
    const product = await Product.create({ ...data, image: image });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
}
