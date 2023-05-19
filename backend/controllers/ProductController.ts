import { Request, Response } from "express";
import ProductModel from "../models/ProductSchema";

export const productController = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const data = new ProductModel(req.body);
    const savedData = await data.save();
    res.send({ message: "Upload success" });
  } catch (error) {
    res.status(500).send({ message: "Upload failed" });
  }
};
