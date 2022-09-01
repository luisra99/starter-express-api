//Importar Modulos
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const app=express();
const port =(process.env.port || 3000);
//Importar configuracion de rutas
import categoriaRoute from './routes/categoria.route.js'
import subCategoriaRoute from './routes/sub_categoria.route.js'
import tallaRoute from './routes/talla.route.js'
import localRoute from './routes/local.route.js'
import trabajadorRoute from './routes/trabajador.route.js'
import curvaturaRoute from './routes/curvatura.route.js'
import materialRoute from './routes/material.route.js'
import productoRoute from './routes/producto.route.js'
import productoExistRoute from './routes/productoexist.route.js'
import colorRoute from './routes/color.route.js'
import viewRoute from './routes/vistas.route.js'
import valesRoute from './routes/vale_venta.route.js'
import tipoGastoRoute from './routes/tipo_gasto.route.js'
import gastoRoute from './routes/gasto.route.js'


//Configuracion del servidor
    //Puerto    
         app.set('port',port);
    //Peticiones
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
         //Cors    
        var corsOptions = {origin: "http://localhost:3001"};
        app.use(cors());
    //Rutas
    app.use(categoriaRoute)
    app.use(subCategoriaRoute)
    app.use(tallaRoute)
    app.use(curvaturaRoute)
    app.use(localRoute)
    app.use(trabajadorRoute)
    app.use(materialRoute)
    app.use(productoRoute)
    app.use(productoExistRoute)
    app.use(colorRoute)
    app.use(viewRoute)
    app.use(valesRoute)
    app.use(tipoGastoRoute)
    app.use(gastoRoute)
export default app;