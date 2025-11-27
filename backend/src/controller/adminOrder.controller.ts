import type { RequestHandler } from "express";
import { prisma } from "../libs/prisma";
import { orderStatus } from "../../generated/prisma/enums";

export const adminUpdateOrder: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ message: "Id and Status is required" });
    }
    if (!Object.values(orderStatus).includes(status)) {
      return res.status(400).json({ message: "Status inválido" });
    }
    const order = await prisma.orders.update({
      where: { id: Number(id) },
      data: {
        status,
      },
      include: { items: { include: { product: true } }, client: true },
    });
    return res.json({ message: "Status update with sucess", order });
  } catch (error) {
    return res.status(404).json({ error: "Order not found" });
  }
};
export const adminGetOrder:RequestHandler=async(req,res)=>{
    try{
        const orders=await prisma.orders.findMany({
            include:{
                client:true,
                items:{
                    include:{
                        product:true
                    }
                }
            }
        })
         return res.json(orders);
    }catch(error){
        return res.status(500).json({ message: "Erro to find orders"})
    }
}