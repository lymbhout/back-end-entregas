const {Router} = require("express")
const ProductManagerCart = require('./clases/classeCart');
const { v4: uuidv4 } = require('uuid');

const ObjetoCart = new ProductManagerCart('./text-cart-file.json')



const router = Router()
let idd= uuidv4()
let local='./text-cart-file.json'
                                //  POST
router.post('carts', async(req,res) =>{
    // const newCart = {
    //     id:uuidv4(),
    //     products:[] || req.body.products, 
    // }
    // await ObjetoCart.writeProducts(newCart)
    
    // res.status(200).json({mesagge:`cart creado `},newCart)

    try {
        const data = await fs.readFile(local, "utf8");
        let carritos = JSON.parse(data);
    
        const nuevoCarrito = {
          id: uuidv4(),
          products: req.body.products || [],
        };
    
        carritos.push(nuevoCarrito);
    
        await fs.writeFile(local, JSON.stringify(carritos, null, 2));
    
        res.status(201).json(nuevoCarrito);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
});

                                // GET

router.get('carts/cid',(req,res)=>{

})

module.exports= router