import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/products.model.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const products = [
  {
    name: "Nike Air Max",
    rating: 4.5,
    price: 120,
    description: "Comfortable running shoes with air cushioning.",
    category: "men",
    imgURL: "https://via.placeholder.com/200x200?text=Women+Shoe+1",
    size: [7, 8, 9, 10, 11],
  },
  {
    name: "Adidas Ultraboost",
    rating: 4.7,
    price: 150,
    description: "High-performance shoes with responsive cushioning.",
    category: "women",
    imgURL: "https://via.placeholder.com/200x200?text=Women+Shoe+1",
    size: [5, 6, 7, 8, 9],
  },
  {
    name: "Puma Kids Runner",
    rating: 4.2,
    price: 60,
    description: "Lightweight sneakers for kids’ everyday wear.",
    category: "kids",
    imgURL: "https://via.placeholder.com/200x200?text=Women+Shoe+1",
    size: [1, 2, 3, 4],
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Dummy data seeded ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
