import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.services.js";

export async function createProduct(req, res) {
  console.log(req.body);
  console.log(req.files);

  const filesUrls = [];

  for (let i = 0; i < req.files.length; i++) {
    const responce = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
    });

    console.log(responce);
    filesUrls.push(responce.url);
  }

  console.log(filesUrls);

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    sizes: req.body.sizes,
    images: filesUrls,
    seller: req.user._id,
  });

  res.status(200).json({
    message: "Product created successfully",
    data: {
      product,
    },
  });
}

export async function listAllProducts(req, res) {
  const products = await productModel.find();

  res.status(200).json({
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
}
