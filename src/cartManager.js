import fs from 'fs/promises'
import { productManager } from './fileManager.js'

export default class CartManager{
    constructor(ruta){
        this.ruta = ruta,
        this.cart = []
    }
    async getCart(){
        try{
        const carts = await fs.readFile(this.ruta, 'utf-8')
        
        return await  JSON.parse(carts)

        }
        catch(error){
            console.log(error);
        }       
        
    }
    async mostrarCart(){
        await this.getCart()
        console.log(this.cart)
    }
    async saveCart(){
        const json=JSON.stringify(this.cart, null, 2)
        await fs.writeFile(this.ruta, json)
    }
    async addCart(c){
        await this.getCart();

        p.id = this.cart.length;
        this.cart.push(c);    
        
        await this.saveCart();
    }
    async getCartById(id){
        await this.getCart()
        const searchId = this.cart.find((cart)=>cart.id === id)

        if(!searchId){
            console.warn('Carrito no encontrado')
        }
        return await searchId;
    }
    async deleteCart(id){
        await this.getCart()

        let searchId = this.cart.findIndex((cart)=>cart.id === id);

        if(!searchId){
            console.warn('Carrito no encontrado')
        } else{
            this.cart.splice(1, searchId);
            await this.saveCart();
            return console.log('Carrito eliminado')
        }
    }
    async updateCart(id, update){
        await this.getCart();
        let searchId = this.cart.findIndex(cart=>cart.id === id);

        if(searchId === -1){
            throw new Error ('Carrito no encontrado para el update')
        } else{
            this.cart[searchId] = update     
            await this.saveCart();
            console.log('cart update')
            return update
        }
    }
    async createCart(){
        await this.getCart()
        let newCartId = Math.floor(Math.random()*1000)
        while(this.cart.findIndex((cart)=>cart.id === newCartId) !== -1){
            newCartId = Math.floor(Math.random()*1000)
        }
        const newCart = {
            id: newCartId,
            products: []
        }
        this.cart.push(newCart)

        await this.saveCart()
        return newCart
    }
    async getProductsInCart(cartId){
        await this.getCart()
        const cart = this.cart.find((cart)=> cart.id === cartId)
        if(!cart){
            console.warn('Cart dont found')
        }
        return cart.products
    }
    async addProductToCart(cartId, productId){
        await this.getCart()
        const cart = this.cart.find((cart)=> cart.id === cartId)
        if (!cart){
            console.warn('Carrito no encontrado')
            return
        }
        const product = await productManager.getProductById(productId);
        if (!product){
            console.warn('producto no encontrado')
            return
        }
        const existProdutc = cart.products.find((p)=>p.product === productId)
        if(existProdutc){
            existProdutc.quantity +=1
        }else{
            cart.products.push({product: productId, quantity: 1})
        }
        await this.saveCart()
    }
    
}

const ruta = './data/cart.json'

export const cartManager = new CartManager(ruta)


