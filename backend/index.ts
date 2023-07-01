import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userSignup, userLogin } from "./controllers/UserController";
import { productController, getAllProduct } from "./controllers/ProductController";


dotenv.config();

const app = express();

// env files
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI

// middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use((req: Request, res: Response, next: () => void) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

// user
app.post("signup", userSignup)
app.post("login", userLogin)

// product api
app.post("uploadProduct", productController)

// get product
app.get("product", getAllProduct)


// connect to database
if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined")
}
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("connected to db")

    app.listen(PORT, () => console.log("listening to port " + PORT));
  })
  .catch((err) => console.log(err));
