import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import { Producto } from './Producto.js';

export const Curvatura=sequelize.define('curvatura',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    curvatura:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
  indexes:[{
    unique:true,
    fields:['curvatura']
  }]
});
Curvatura.hasMany(Producto,{
  foreignKey:'id_curvatura',
  sourceKey:'id'
})
Producto.belongsTo(Curvatura,{
  foreignKey:'id_curvatura',
  targetId:'id'
})