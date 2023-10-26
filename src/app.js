//quieres globales
const   express = require('express')

// export
const useProducts = require('./routers/products.router.js')
const useCart = require('./routers/cart.router.js')

// llamando app
const app = express()
//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api',useProducts)
app.use('/api',useCart)


app.listen('8080',()=>{
    console.log('servidor express 8080 escuchado con exito');
});
