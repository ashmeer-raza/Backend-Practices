import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.services.js";

export async function createProduct(req, res) {
  console.log(req.body);
  console.log(req.files);

  const filesUrls = await Promise.all(
    req.files.map(async (file) => {
      const response = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
      return response.url;
    }),
  );

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
  const products = await productModel.find({ published: true });

  res.status(200).json({
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
}

export async function unlistProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // make product unpublished
  await productModel.findByIdAndUpdate(id, {
    published: false,
  });

  res.status(200).json({
    message: "Product unpublished successfully",
  });
}

export async function listProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // make product published
  await productModel.findByIdAndUpdate(id, {
    published: true,
  });

  res.status(200).json({
    message: "Product published successfully",
  });
}

export async function listAllProductsToSeller(req, res) {
  const products = await productModel.find({ seller: req.user._id });

  res.status(200).json({
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
}
