import asyncHandler from 'express-async-handler';

import { prisma } from '../config/prismaConfig.js';


export const createResidency = asyncHandler(async (req, res) => {
    const{
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        userEmail
    }=req.body.data;
    console.log(req.body.data);
    try{
        const residency = await prisma.residency.create({
            data:{
                title,
                description,
                price,
                address,
                country,
                city,
                facilities,
                image,
                owner:{
                    connect:{
                        email:userEmail
                    }
                }
            }
        });
    res.status(200).json({
        message: 'Residency created successfully',
        data: residency
    });
    }catch(error){
        if(error.code==="P2002"){
            throw new Error('a residency with the same title already exists');
        }
        throw new Error(error.message);
    }
});

export const allResidencies=asyncHandler(async(req,res)=>{
    const residencies= await prisma.residency.findMany({
        orderBy:{
            createdAt:'desc'
        },
    })
    res.send(residencies);
})

export const getResidency=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    // console.log(req.params);
    try {
        const residency= await prisma.residency.findUnique({
            where:{
                id
            }
        });
        res.send(residency);
    } catch (error) {
        throw new error.message
    }
    

})