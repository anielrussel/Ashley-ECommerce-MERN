import { Request, Response } from "express";
import ProductModel from "../models/ProductSchema";

export const productController = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const data = new ProductModel(req.body);
    await data.save();
    res.send({ message: "Upload success" });
  } catch (error) {
    res.status(500).send({ message: "Upload failed" });
  }
};

export const getAllProduct = async (req:Request, res:Response) => {
  try {
    const data = await ProductModel.find({})
    res.send(JSON.stringify(data))
  } catch (error) {
    res.status(500).send({ message: "Failed to get products"})
  }
}
