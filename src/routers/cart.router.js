const {Router} = require("express")
const fs = require('fs').promises
const ProductManagerCart = require('./clases/classeCart');
const { v4: uuidv4 } = require('uuid');

const ObjetoCart = new ProductManagerCart('./text-cart-file.json')


const router = Router()
let idd= uuidv4()
let local='./text-cart-file.json'

                                //  POST
router.post('/carts', async(req,res) =>{
    const newCart = {
        id:uuidv4(),
        products:[] || req.body.products, 
    }
    await ObjetoCart.writeProducts(newCart)
    
    res.status(200).json(newCart)
});

                                // GET

router.get('/carts/:cid', async(req,res)=>{
    const {cid} = req.params

    const OBYid = await ObjetoCart.getProductById(cid)
    if (OBYid) {
        res.status(200).json(OBYid);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
})

                                  // POST DE LOS PRODUCTOS

// router.post('/carts/:cid/product/:pid ',async (req,res)=>{
//     const {cid,pid} = req.params
//     const OBYid = await ObjetoCart.getProductById(cid)
//     let found = false;


// // Buscar si el producto ya está en el carrito
//     for (const item of OBYid.products) {
//         if (item.productoIds === pid) {
//             item.quantity++;
//             found = true;
//             break;
//         }
//     }

//     // Si el producto no está en el carrito, añadirlo con cantidad 1
//     if (found) {
//         const proct = OBYid.products.push({
//             id:1,
//             quantity:1
//         })
//         ObjetoCart.writeProducts(proct)
//     }
//     res.status(200).json({mesage:'producto agregado con exito'})
// })

/* ruta agregarle un producto al carrito */
router.post("/:cid/producto/:pid", async (req, res) => {
    try {
      const data = await fs.readFile(local, "utf8");
      const carritos = JSON.parse(data);
      const idCarrito = req.params.cid;
      const idProducto = req.params.pid;
  
      const carrito = carritos.find((cart) => cart.id === idCarrito);
  
      if (carrito) {
        const dataProducto = await fs.readFile(local, "utf8");
        const productos = JSON.parse(dataProducto);
        const producto = productos.find((prod) => prod.id === idProducto);
  
        if (producto) {
          const productoIds = producto.id;
          let found = false;
  
          // Buscar si el producto ya está en el carrito
          for (const item of carrito.products) {
            if (item.productoIds === productoIds) {
              item.quantity++;
              found = true;
              break;
            }
          }
  
          if (!found) {
            // Si el producto no está en el carrito, añadirlo con cantidad 1
            carrito.products.push({ productoIds, quantity: 1 });
          }
  
          await fs.writeFile(carritoFilePath, JSON.stringify(carritos, null, 2));
  
          res.status(200).json(carrito);
        } else {
          res.status(404).json({ error: "Producto no encontrado" });
        }
      } else {
        res.status(404).json({ error: "Carrito no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  
    /* limpiar el carro */
  });


module.exports= router