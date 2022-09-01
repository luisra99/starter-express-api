import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'

export const Gasto=sequelize.define('gasto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull: false
    },
    monto:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNull: false
    }
});
