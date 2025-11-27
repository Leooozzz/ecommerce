import type { RequestHandler } from "express";
import { prisma } from "../libs/prisma";
import { Category } from "../../generated/prisma/enums";

export const adminPostProducts: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    if (!name || !price || !stock || !category) {
      return res.status(400).json({ message: "You forgot to send something." });
    }
    if (!Object.values(Category).includes(category)) {
      return res.status(400).json({ message: "Invalid Categoty." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        category,
      },
    });
    return res.status(201).json({ product });
  } catch (error) {
    return res.status(500).json({ error: "Error to create new product" });
  }
};
export const adminProductsupdate: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }
    const { name, description, price, stock, category } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price,
        stock,
        category,
      },
    });
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ error: "product not find" });
  }
};
export const adminProductDelete: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    return res.status(200).json({ message: "Product removed with sucess" });
  } catch (error) {
    return res.status(404).json({ error: "Product not find" });
  }
};
