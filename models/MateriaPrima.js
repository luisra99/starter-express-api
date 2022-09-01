import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'

export const MateriaPrima=sequelize.define('materia_prima',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    materia_prima:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
  indexes:[{
    unique:true,
    fields:['materia_prima']
  }]
});