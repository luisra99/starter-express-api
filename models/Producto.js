import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import { ProductoExist } from './ProductoExist.js';
import {ValeDeVenta} from './ValeDeVenta.js';
import {Merma} from './Merma.js';
import {Reparacion} from './Reparacion.js';
export const Producto=sequelize.define('producto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
},{
    indexes:[{
      unique:true,
      fields:['id_curvatura','id_material','id_subcategoria']
    }]
  }
);
Producto.hasMany(ProductoExist,{
  foreignKey:'id_producto',
  sourceKey:'id'
})
ProductoExist.belongsTo(Producto,{
  foreignKey:'id_producto',
  targetId:'id'
})  
Producto.hasMany(ValeDeVenta,{
  foreignKey:'id_producto',
  sourceKey:'id'
})
ValeDeVenta.belongsTo(Producto,{
  foreignKey:'id_producto',
  targetId:'id'
})
Producto.hasMany(Merma,{
  foreignKey:'id_producto',
  sourceKey:'id'
})
Merma.belongsTo(Producto,{
  foreignKey:'id_producto',
  targetId:'id'
})
Producto.hasMany(Reparacion,{
  foreignKey:'id_producto',
  sourceKey:'id'
})
Reparacion.belongsTo(Producto,{
  foreignKey:'id_producto',
  targetId:'id'
})