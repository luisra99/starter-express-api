import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import { Producto } from './Producto.js';

export const SubCategoria=sequelize.define('sub_categoria',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    sub_categoria:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
  indexes:[{
    unique:true,
    fields:['sub_categoria']
  }]
});
SubCategoria.hasMany(Producto,{
  foreignKey:'id_subcategoria',
  sourceKey:'id'
})
Producto.belongsTo(SubCategoria,{
  foreignKey:'id_subcategoria',
  targetId:'id'
})