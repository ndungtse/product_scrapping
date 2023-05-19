"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ApiResponse_1 = require("./utils/ApiResponse");
const products_route_1 = __importDefault(require("./routes/products.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// routes
app.use("/products", products_route_1.default);
const PORT = process.env.PORT || 3232;
app.get("/", (req, res) => {
    res.json(new ApiResponse_1.ApiResponse("Hello World!"));
});
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
