"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignup = void 0;
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
// signup
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email } = req.body;
    try {
        const existingUser = yield UserSchema_1.default.findOne({ email });
        if (existingUser) {
            res.send({ message: "Email is already in use!", alert: false });
        }
        else {
            const newUser = new UserSchema_1.default(req.body);
            yield newUser.save();
            res.send({ message: "Successfully signed up!", alert: false });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error", alert: false });
    }
});
exports.userSignup = userSignup;
// login
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const result = yield UserSchema_1.default.findOne({ email });
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
            }
            else {
                res.send({ message: "Incorrect password!", alert: false });
            }
        }
        else {
            res.send({
                message: "Email is not valid!",
                alert: false,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error", alert: false });
    }
});
exports.userLogin = userLogin;
