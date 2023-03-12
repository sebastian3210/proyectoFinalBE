import { Router } from "express";
import { productManager, Products } from "../fileManager.js";
import { randomUUID } from 'crypto'

export const apiProduct = Router()


apiProduct.get('/', async(req, res, next)=>{
    try{
        const products = await productManager.getProducts()
        const limitValue = +(req.query.limit)
        if(!limitValue){
            res.json(products)
        } else{
            const productLimit = products.slice(0,limitValue)
            res.json(productLimit)
        }
    }
    catch(error){
        console.log(error)
    }
    next()
})

apiProduct.get('/:pid', async(req, res ,next)=>{
    try{
        const { pid } = req.params;
        const productById = await productManager.getProductById(+pid)
        productById ? res.json(productById) : res.json({message: 'error 404: Not found'})   
        console.log(productById)     
    } 
    catch (error) {
        next(error);
    }
    
})

apiProduct.post('/', async(req,res)=>{
    const pro = new Products({
        id: randomUUID(),
        ...req.body
    })
    const add = await productManager.addproduct(pro)
    res.json(add)
    console.log(add)
})

apiProduct.put('/:pid',async (req,res,next)=>{
    let productNew
    try{
        productNew = new Products({
            id: req.params.pid,
            ...req.body
        })
    } catch(error){
        res.status(400).json({message : error.message})
    }
    try{
        const update = await productManager.updateProduct(req.params.pid.productNew)
        res.json(update)
    }catch(error){
        res.status(400).json({message : error.message})
        next()
    }    
})

apiProduct.delete('/:pid', async(req, res,next)=>{
    try{
        const deleteP = await productManager.deleteProduct(req.params.pid)
        res.json(deleteP)
    }catch(error){
        res.status(404).json({message : error.message})
    }
    next()
})