import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
import {ValeDeVenta} from './ValeDeVenta.js';
import {Merma} from './Merma.js';
export const Trabajador=sequelize.define('trabajador',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    ci:{
        type:DataTypes.STRING,
        allowNull: false
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull: false
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    primer_apellido:{
        type:DataTypes.STRING,
        allowNull: false
    },
    segundo_apellido:{
        type:DataTypes.STRING,
        allowNull: false
    },
    contacto:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    salario_base:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
},{
        indexes:[{
          unique:true,
          fields:['ci']
        }] 
});
Trabajador.hasMany(ValeDeVenta,{
    foreignKey:'id_trabajador',
    sourceKey:'id'
  })
  ValeDeVenta.belongsTo(Trabajador,{
    foreignKey:'id_trabajador',
    targetId:'id'
  })
  Trabajador.hasMany(Merma,{
    foreignKey:'id_trabajador',
    sourceKey:'id'
  })
  Merma.belongsTo(Trabajador,{
    foreignKey:'id_trabajador',
    targetId:'id'
  })