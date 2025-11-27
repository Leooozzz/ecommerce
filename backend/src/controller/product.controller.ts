import type { RequestHandler } from "express";
import { prisma } from "../libs/prisma";
import type { Category } from "../../generated/prisma/enums";


export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    res.json(products)
  } catch (error) {
    return res.status(500).json({ error: "Error to find products" })
  }
};

export const getSingleProduct:RequestHandler=async(req,res)=>{
    try{
       const {id}=req.params;
       const product=await prisma.product.findUnique({
        where:{id:Number(id)}
       })
       if(!product){
        res.status(404).json({message:"Product not find"})
       }
       res.json(product)
    }catch(error){
        return res.status(500).json({ error: "Error to find products"})
    }
}

export const getProductForCategory:RequestHandler=async(req,res)=>{
    try{
        const {category}=req.params;
        const product=await prisma.product.findMany({
            where:{category:category as Category}
        })
        if(product.length === 0 ){
            return res.status(404).json({message:"Error finding products by category."})
        }
        res.json(product);

    }catch(error){
         return res.status(500).json({ error: "Error to find products for category"})
    }
}