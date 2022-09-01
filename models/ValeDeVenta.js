import{DataTypes, Sequelize} from 'sequelize'
import{sequelize} from '../config/database.js'
export const ValeDeVenta=sequelize.define('vale_de_venta',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue:Sequelize.NOW
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    costo:{
        type:DataTypes.DECIMAL,
        allowNull: false
    },
    precio:{
        type:DataTypes.DECIMAL,
        allowNull: false
    },
    comision:{
        type:DataTypes.DECIMAL,
        allowNull: false
    }
}
);
