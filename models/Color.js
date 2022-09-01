import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import { ProductoExist } from './ProductoExist.js';
import { ValeDeVenta } from './ValeDeVenta.js';

export const Color=sequelize.define('color',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    color:{
        type:DataTypes.STRING
    }
},{
  indexes:[{
    unique:true,
    fields:['color']
  }]
});
Color.hasMany(ProductoExist,{
  foreignKey:'id_color',
  sourceKey:'id'
})
ProductoExist.belongsTo(Color,{
  foreignKey:'id_color',
  targetId:'id'
})
Color.hasMany(ValeDeVenta,{
    foreignKey:'id_color',
    sourceKey:'id'
  })
  ValeDeVenta.belongsTo(Color,{
    foreignKey:'id_color',
    targetId:'id'
  })