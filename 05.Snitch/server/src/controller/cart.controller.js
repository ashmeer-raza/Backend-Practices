import cartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

export async function addToCart(req, res) {
  const { productId, quantity, size } = req.body;

  // Check if the user already has a cart
  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const selectedSize = product.sizes.find((s) => s === size);

  if (!selectedSize) {
    return res.status(400).json({
      message: "Selected size is not available for this product",
    });
  }

  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Selected size does not have enough stock",
    });
  }

  //   let cart = await CartModel.findOne({ user: req.user._id });

  //   if (!cart) {
  //      If the user doesn't have a cart, create a new one
  //     cart = await CartModel.create({ user: req.user._id, products: [] });
  //   }

  // The nullish coalescing operator (??) is used to check if the left-hand side is null or undefined. If it is, the right-hand side is evaluated and returned. In this case, if the cart is null or undefined, a new cart is created for the user using the createCart function.
  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await createCart(req.user.userId));

  const productInCart = cart.products.find(
    // string used because product is an ObjectId and productId is a string. So, we need to convert the ObjectId to a string before comparing it with the productId.
    (p) => p.product.toString() === productId && p.size === size,
  );

  if (productInCart) {
    if (productInCart.quantity + quantity > selectedSize.stock) {
      return res.status(400).json({
        message: "Selected size does not have enough stock",
      });
    }

    await cartModel.updateOne(
      {
        user: req.user.userId,
        "products.product": productId,
        "products.size": size,
      },
      {
        // The $inc operator is used to increment the quantity of the product in the cart by the specified quantity. If the product is not already in the cart, it will be added with the specified quantity.
        $inc: {
          "products.$.quantity": quantity,
        },
      },
    );

    return res.status(200).json({
      message: "Product quantity updated in cart",
    });
  }

  // If the product is not already in the cart, add it to the cart
  await cartModel.findOneAndUpdate(
    {
      user: req.user.userId,
    },
    {
      $push: {
        products: {
          product: productId,
          quantity: quantity,
          size: size,
        },
      },
    },
  );

  return res.status(200).json({
    message: "Product added to cart",
  });
}

export async function getCart(req, res) {
  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await createCart(req.user.userId));

  return res.status(200).json({
    message: "Cart fetched successfully",
    data: {
      cart,
    },
  });
}
