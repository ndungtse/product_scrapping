"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    swaggerDefinition: {
        info: {
            title: "Your API Title",
            version: "1.0.0",
            description: "Your API description",
        },
    },
    apis: ["routes/products.route.js"], // Path to your API route files
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
