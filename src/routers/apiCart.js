import { Router } from "express";
import { cartManager } from "../cartManager.js";


export const apiCart = Router()


apiCart.post('/', async(req,res)=>{
    try{
        const newCart = await cartManager.createCart()
        res.status(201).json(newCart)
    }catch(error){
        res.status(500).json({ message : error.message})
    }
})

apiCart.get('/:cid', async (req,res)=>{
    try{
        const cartId = parseInt(req.params.cid)
        const cart = await cartManager.getCartById(cartId)
        if(!cart){
            return res.status(404).send('Cart not found')
        }
        const products = await cartManager.getProductsInCart(cartId)
        res.json(products)
    } catch (error){
        res.status(500).send('Internal server error')
    }
})
apiCart.post('/:cid/product/:pid', async (req, res)=>{
    try{
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
        await cartManager.addProductToCart(cartId, productId)
        res.status(201).send('Product added to cart')
    } catch (error){
        console.log(error)
        res.status(500).send('Internal server error')
    }
})

