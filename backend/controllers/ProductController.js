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
exports.getAllProduct = exports.productController = void 0;
const ProductSchema_1 = __importDefault(require("../models/ProductSchema"));
const productController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const data = new ProductSchema_1.default(req.body);
        yield data.save();
        res.send({ message: "Upload success" });
    }
    catch (error) {
        res.status(500).send({ message: "Upload failed" });
    }
});
exports.productController = productController;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield ProductSchema_1.default.find({});
        res.send(JSON.stringify(data));
    }
    catch (error) {
        res.status(500).send({ message: "Failed to get products" });
    }
});
exports.getAllProduct = getAllProduct;
