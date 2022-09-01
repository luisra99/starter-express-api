import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'

export const Reparacion=sequelize.define('reparacion',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    contacto:{
        type:DataTypes.STRING,
        allowNull: false
    },
    unidades:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull: false
    }
}
);
