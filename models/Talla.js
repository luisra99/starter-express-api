import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import { ProductoExist } from './ProductoExist.js';

export const Talla=sequelize.define('talla',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    talla:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
  indexes:[{
    unique:true,
    fields:['talla']
  }]
});
Talla.hasMany(ProductoExist,{
  foreignKey:'id_talla',
  sourceKey:'id'
})
ProductoExist.belongsTo(Talla,{
  foreignKey:'id_talla',
  targetId:'id'
})