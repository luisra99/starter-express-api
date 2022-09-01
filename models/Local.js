import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import { Trabajador } from './Trabajador.js';
import { ProductoExist } from './ProductoExist.js';
import {ValeDeVenta} from './ValeDeVenta.js';
import {Merma} from './Merma.js';
import { Reparacion } from './Reparacion.js';

export const Local=sequelize.define('local',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    direccion:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    nombre:{
      type:DataTypes.TEXT,
      allowNull: false
  },
    trabajadores:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    tipo:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
},{
  indexes:[{
    unique:true,
    fields:['direccion']
  }]
});
Local.hasMany(Trabajador,{
    foreignKey:'id_local',
    sourceKey:'id'
  })
Trabajador.belongsTo(Local,{
    foreignKey:'id_local',
    targetId:'id'
  })
Local.hasMany(ProductoExist,{
    foreignKey:'id_local',
    sourceKey:'id'
  })
ProductoExist.belongsTo(Local,{
    foreignKey:'id_local',
    targetId:'id'
  })
  Local.hasMany(ValeDeVenta,{
    foreignKey:'id_local',
    sourceKey:'id'
  })
  ValeDeVenta.belongsTo(Local,{
    foreignKey:'id_local',
    targetId:'id'
  })
  Local.hasMany(Merma,{
    foreignKey:'id_local',
    sourceKey:'id'
  })
  Merma.belongsTo(Local,{
    foreignKey:'id_local',
    targetId:'id'
  })
  Local.hasMany(Reparacion,{
    foreignKey:'id_local',
    sourceKey:'id'
  })
  Reparacion.belongsTo(Local,{
    foreignKey:'id_local',
    targetId:'id'
  })