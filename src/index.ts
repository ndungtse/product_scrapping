import express from "express";
import dotenv from "dotenv";
import { ApiResponse } from "./utils/ApiResponse";
import productsRoutes from "./routes/products.route";
dotenv.config();

const app = express();

// routes
app.use("/products", productsRoutes);

const PORT = process.env.PORT || 3232;

app.get("/", (req, res) => {
  res.json(new ApiResponse("Hello World!"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
