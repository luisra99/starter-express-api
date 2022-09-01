import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import {Gasto} from './Gasto.js';
export const TipoGasto=sequelize.define('tipo_gasto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tipo_gasto:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
  indexes:[{
    unique:true,
    fields:['tipo_gasto']
  }]
});
TipoGasto.hasMany(Gasto,{
  foreignKey:'id_tipogasto',
  sourceKey:'id'
})
Gasto.belongsTo(TipoGasto,{
  foreignKey:'id_tipogasto',
  targetId:'id'
})