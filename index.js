import app from "./app.js"
import {sequelize} from './config/database.js'
import './models/Categoria.js'
import './models/Color.js'
import './models/Curvatura.js'
import './models/Gasto.js'
import './models/Local.js'
import './models/Material.js'
import './models/MateriaPrima.js'
import './models/Merma.js'
import './models/Producto.js'
import './models/ProductoExist.js'
import './models/Reparacion.js'
import './models/SubCategoria.js'
import './models/Talla.js'
import './models/TipoGasto.js'
import './models/Trabajador.js'
import './models/ValeDeVenta.js'

async function main(){
  try {
      const port=app.get('port')
      await sequelize.sync({force:false});
      app.listen(port,(error)=>{
      error? console.log("Error al inicar servidor: " + error): console.log("Servidor iniciado en el puerto: "+port)})
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

}
main();
