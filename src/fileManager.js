import fs from 'fs/promises'



export default class ProductManager{
    constructor(ruta){
        this.ruta = ruta
        this.product = []            
    }
    async getProducts(){
        try{
        const products = await fs.readFile(this.ruta, 'utf-8')
        this.product = JSON.parse(products)
        //return await  JSON.parse(products)

        }
        catch(error){
            console.log(error);
        }       
        
    }

    async mostrarProduct(){
        await this.getProducts()
        console.log(this.product)
    }

    async saveProduct(){
        const json=JSON.stringify(this.product, null, 2)
        await fs.writeFile(this.ruta, json)
    }

    async addproduct(p){
        await this.getProducts();

        p.id = this.product.length;
        this.product.push(p);    
        
        await this.saveProduct();
        


    }
    async getProductById(id){
        await this.getProducts()
        const searchId = this.product.find((product)=>product.id === id)

        if(!searchId){
            console.warn('Producto no encontrado')
        }
        return await searchId;
    }
    async deleteProduct(id){
        await this.getProducts()

        let searchId = this.product.findIndex((product)=>product.id === id);

        if(!searchId){
            console.warn('Producto no encontrado')
        } else{
            this.product.splice(searchId, 1);
            await this.saveProduct();         
            return console.log('producto eliminado')
        }
    }
    async updateProduct(id, update){
        await this.getProducts()
        let searchId = this.product.findIndex(prod => prod.id == id)
        console.log('ID:', id);        
        console.log('searchId:', searchId);
        

        if(searchId === -1){
            throw new Error ('Producto no encontrado para el update')
        } else{
            this.product[searchId] = {...this.product[searchId], ...update} 
            await this.saveProduct()
            console.log('producto update')
            return update
        }
    }  
}

export class Products{
    constructor(data){
        const{title, description, price, thumbnail, code,stock, category} = data;
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.status = true,
        this.stock = stock,
        this.category = category
    }
}

const ruta = './data/product.json'


export  const productManager = new ProductManager(ruta)



let product1 = new Products({title:'Head Graphene360+Alpha Elite Negro', description: 'Excelente estado', price: 200, thumbnail:'thumbnail',code: "abc5466", status: true, stock: 1,category : 'palas'});
let product2 = new Products({title:'Adidas Training CTRL', description: 'Carbono 2.0', price: 400, thumbnail:'thumbnail',code: "abc5467",status : true, stock: 3, category: 'palas'});
let product3 = new Products({title:'Nox Pala MI10 Pro cup', description: 'fibra de carbono 2.0', price: 500, thumbnail:'thumbnail',code: "abc5468",status:true, stock: 10, category : 'palas'});
let product4 = new Products({title:'Adidas Metalbone 3.2', description: 'Balance Alto con fibra de carbono', price: 300, thumbnail:'thumbnail',code: "abc5469",status:true, stock: 7, category:'palas'});
let product5 = new Products({title:'Nox Pala At10 Genius 18k', description: 'Fibra de carbono 2.0 Redonda', price: 300, thumbnail:'thumbnail',code: "abc5469",status : true, stock: 7, category : 'palas'});
let product6 = new Products({title:'Adidas Pala Kaltom Attk 2.0', description: 'fibra de carbono buen balance para potencia', price: 300, thumbnail:'thumbnail',code: "abc5469",status : true, stock: 7, category :'palas'});
let product7 = new Products({title:'Wilson Pala Ws 10.23', description: 'Azul fibra de vidrio y carbono', price: 300, thumbnail:'thumbnail',code: "abc5469",status : true, stock: 7, category: 'palas'});
let product8 = new Products({title:'Varlion Avant C ti Difusor Black Negro', description: 'Carbono 2.0', price: 300, thumbnail:'thumbnail',code: "abc5469",status:true, stock: 7, category : 'palas'});
let product9 = new Products({title:'Pelotitas de padel Wilson', description: 'buen pique para cancha de cemento', price: 30, thumbnail:'thumbnail',code: "abc5469",status:true, stock: 7, category: 'pelotas'});
let product10 = new Products({title:'Pelotitas Bullpadel', description: 'buen pique para cancha de cemento', price: 32, thumbnail:'thumbnail',code: "abc5469",status:true, stock: 7, category: 'pelotas'});
let product11 = new Products({title:'Camiseta Bullpadel', description: 'muy buena tela deportiva', price: 100, thumbnail:'thumbnail',code: "abc5469",status:true, stock: 7, category:'indumentaria'});
let product12 = new Products({title:'short deportivo', description: 'short', price: 80, thumbnail:'thumbnail',code: "abc5469",status:true, stock: 7, category:'indumentaria'});
let product13 = new Products({title:'medias wilson', description: 'muy buena tela', price: 45, thumbnail:'thumbnail',code: "abc5469",status:true, stock: 7, category: 'indumentaria'});


productManager.getProducts().then((res)=> console.log(res))

await productManager.addproduct(product1)
await productManager.addproduct(product2)
await productManager.addproduct(product3)
await productManager.addproduct(product4)
await productManager.addproduct(product5)
await productManager.addproduct(product6)
await productManager.addproduct(product7)
await productManager.addproduct(product8)
await productManager.addproduct(product9)
await productManager.addproduct(product10)
await productManager.addproduct(product11)
await productManager.addproduct(product12)
await productManager.addproduct(product13)


