import express, { Router } from 'express'
import { apiCart } from './apiCart.js'
import { apiProduct } from './apiProduct.js'



export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({extended :true}))


apiRouter.use('/product', apiProduct)
apiRouter.use('/cart', apiCart)
