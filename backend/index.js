"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserController_1 = require("./controllers/UserController");
const ProductController_1 = require("./controllers/ProductController");
dotenv_1.default.config();
const app = (0, express_1.default)();
// env files
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// routes
app.get("/", (req, res) => {
    res.send("server is running");
});
// user
app.post("/signup", UserController_1.userSignup);
app.post("/login", UserController_1.userLogin);
// product api
app.post("/uploadProduct", ProductController_1.productController);
// get product
app.get("/product", ProductController_1.getAllProduct);
// connect to database
if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
}
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => console.log("listening to port " + PORT));
})
    .catch((err) => console.log(err));
