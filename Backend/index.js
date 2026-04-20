import Product from "./models/products.model.js";
import initializeDB from "./db/db.connect.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

await initializeDB();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0)
      res.status(404).json({ error: "No products found" });
    else res.json(products);
  } catch (error) {
    console.log("Error fetching the products.");
  }
});

app.get("/products/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on PORT", port);
});
