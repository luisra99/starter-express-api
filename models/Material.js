import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import { Producto } from './Producto.js';

export const Material=sequelize.define('material',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    material:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
  indexes:[{
    unique:true,
    fields:['material']
  }]
});
Material.hasMany(Producto,{
  foreignKey:'id_material',
  sourceKey:'id'
})
Producto.belongsTo(Material,{
  foreignKey:'id_material',
  targetId:'id'
})