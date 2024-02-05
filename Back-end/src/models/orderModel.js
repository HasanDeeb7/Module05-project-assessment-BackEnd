import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  products: { type: [Schema.Types.ObjectId], required: true },
  quantity: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
    required: true,
  },
});
export default model("Order", orderSchema);
