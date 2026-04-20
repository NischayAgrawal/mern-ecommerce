import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["men", "women", "kids"],
      required: true,
    },

    imgURL: {
      type: String,
      required: true,
    },

    size: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
