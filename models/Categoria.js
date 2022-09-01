import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import { SubCategoria } from './SubCategoria.js';

export const Categoria =sequelize.define('categoria',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    categoria:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
  indexes:[{
    unique:true,
    fields:['categoria']
  }]
});
Categoria.hasMany(SubCategoria,{
  foreignKey:'id_categoria',
  sourceKey:'id'
})
SubCategoria.belongsTo(Categoria,{
  foreignKey:'id_categoria',
  targetId:'id'
})