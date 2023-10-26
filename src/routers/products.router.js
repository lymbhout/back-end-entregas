const {Router} = require("express")
const ProductManager = require('../Clase.js');
const { v4: uuidv4 } = require('uuid');

const Objetos1 = new  ProductManager('./text-output-file.json')
// Objetos1.addProduct('camisa','blanca',22,'no img',1,25)
// Objetos1.addProduct('camisa','blanca rosa',22,'no img',2,25)
// Objetos1.addProduct('camisa','negra',22,'no img',3,25)
// Objetos1.addProduct('camisa','gris',22,'no img',4,25)
// Objetos1.addProduct('camisa','azul',22,'no img',5,25)
// Objetos1.addProduct('camisa','azul clara',22,'no img',6,25)
// Objetos1.addProduct('camisa','rosa',22,'no img',7,25)
// Objetos1.addProduct('camisa','verde',22,'no img',8,25)

const router = Router()
let idd= uuidv4()

                                             // PRODUCTS
// router GET
router.get('/products',async (req,res) => {
    const {query} = req;
    const {limit}= query;
    let llamar = await Objetos1.getProducts()
    if(!limit){
        res.status(200).json(llamar)
    }else{
        const result = llamar.filter((product) => product.id <= parseInt(limit));
        res.status(200).json(result);
    }
})

router.get ('/products/:pid', async(req,res)=>{
    let pid = req.params.pid
    let llamarByID = await Objetos1.getProductById(pid)
    if(!llamarByID){return res.status(404).json({error:'Producto no encontrado '})}

    res.status(200).json(llamarByID)
})

// router POST

router.post('/products', async(req,res)=>{
    const {body} = req;
    const newProducts ={
        ...body,
        status:true,
        id:idd
        
    }
    await Objetos1.writeProducts(newProducts)
    res.status(201).json({message:"producto agregado con exito "} ,newProducts)
})

// router PUT
router.put('/products/:pid', async(req,res)=>{
    const {body,params} = req;
    const proctID = params.pid

    let posiciones = await Objetos1.getProducts()
        const newPosition = 
        posiciones[proctID] = {
        id:proctID,
        ...body,
    }
    await Objetos1.delateProduct(proctID)
    await Objetos1.writeProducts(newPosition)
    res.status(200).json({message:`producto ${proctID} actualizado con exito !!!! `})
})

// router DELATE
router.delete('/products/:pid',async(req,res)=>{
const {params} = req;
const proctID = params.pid
await Objetos1.delateProduct(proctID)
res.status(200).json({message:`producto ${proctID} eliminado con exito!!!!`})
})



module.exports= router