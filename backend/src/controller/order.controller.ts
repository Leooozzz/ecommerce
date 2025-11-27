import type { RequestHandler } from "express";
import { prisma } from "../libs/prisma";

// Criar pedido
export const createOrderController: RequestHandler = async (req, res) => {
  try {
    const { clientId, items } = req.body;

    if (!clientId || !items || items.length === 0) {
      return res.status(400).json({ message: "clientId e items is required" });
    }

    const products = await prisma.product.findMany({
      where: {
        id: { in: items.map((i: { productId: number }) => i.productId) },
      },
    });

    let total = 0;
    const orderItemsData = items.map(
      (i: { productId: number; amount: number }) => {
        const product = products.find((p) => p.id === i.productId);
        if (!product) throw new Error(`Produto ${i.productId} not find`);
        total += Number(product.price) * i.amount;
        return {
          productId: i.productId,
          amount: i.amount,
          unitPrice: product.price,
        };
      }
    );

    const order = await prisma.orders.create({
      data: {
        clientId: Number(clientId),
        total,
        items: {
          create: orderItemsData,
        },
      },
      include: { items: { include: { product: true } }, client: true },
    });

    res.status(201).json(order);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error create new order", error: error.message });
  }
};

// Listar todos os pedidos
export const getOrdersController: RequestHandler = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      include: { items: { include: { product: true } }, client: true },
    });
    res.json(orders);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error to find order", error: error.message });
  }
};

// Buscar pedido por ID
export const getOrderByIdController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.orders.findUnique({
      where: { id: Number(id) },
      include: { items: { include: { product: true } }, client: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: "Order not found", error: error.message });
  }
};

// Buscar pedidos de um cliente
export const getOrdersByClientController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await prisma.orders.findMany({
      where: { clientId: Number(id) },
      include: { items: { include: { product: true } }, client: true },
    });

    res.json(orders);
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Error retrieving customer orders.",
        error: error.message,
      });
  }
};
