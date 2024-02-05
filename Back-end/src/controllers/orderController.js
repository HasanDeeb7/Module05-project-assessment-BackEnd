import Order from "../models/orderModel.js";

export async function getOrders(req, res) {
  try {
    const orders = await Order.find();
    if (orders) {
      return res.json(orders);
    } else {
      return res.status(404).json({ message: "Orders not founds" });
    }
  } catch (error) {
    console.log(error);
  }
}
export async function createOrder(req, res) {
  const { products } = req.body;
  const quantity = products?.length;
  const userId = req.user.id;
  try {
    const newOrder = await Order.create({
      products: products,
      quantity: quantity,
      user: userId, 
    });
    if (newOrder) {
      return res.json(newOrder);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function updateStatus(req, res) {
  const { newStatus, id } = req.body;

  try {
    const response = await Order.findByIdAndUpdate(id, { status: newStatus });
  } catch (error) {}
}
