import { Request, Response } from "express";
import UserModel from "../models/UserSchema";

// signup
export const userSignup = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.send({ message: "Email is already in use!", alert: false });
    } else {
      const newUser = new UserModel(req.body);
      await newUser.save();
      res.send({ message: "Successfully signed up!", alert: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", alert: false });
  }
};

// login
export const userLogin = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const result = await UserModel.findOne({ email });

    if (result) {
      if (result.password === password) {
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.send({ message: "Login Successful!", alert: true, data: dataSend });
      } else {
        res.send({ message: "Incorrect password!", alert: false });
      }
    } else {
      res.send({
        message: "Email is not valid, please sign up!",
        alert: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", alert: false });
  }
};
