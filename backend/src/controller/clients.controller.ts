import type { RequestHandler } from "express";
import { prisma } from "../libs/prisma";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const clientsRegisterController: RequestHandler = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const existinClient = await prisma.client.findUnique({ where: email });
    if (existinClient) {
      return res.status(400).json({ message: "email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await prisma.client.create({
      data: {
        name,
        email,
        password,
        address,
        phone,
      },
    });
    res.status(201).json({ message: "Client create with sucess", client });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao registrar cliente", error});
  }
};


export const clientLoginController:RequestHandler=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const client =await prisma.client.findUnique({where:email});
        if(!client){
            return res.status(404).json({message:"client is not find"})
        }
        if(!email){
            return res.status(404).json({message:"user not find"})
        }
        const passwordIsValid=await bcrypt.compare(password, client.password);
        if(!passwordIsValid){
            return res.status(401).json({message:"invalid password"})
        }
        const tokenJwt=jwt.sign(
            {id:client.id , role:client.role},
            process.env.JWT_SECRET !
        )
        res.status(200).json({message:"Login sucess",tokenJwt})
    }catch(error){

    }
}