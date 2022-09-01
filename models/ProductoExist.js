import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'
export const ProductoExist=sequelize.define('producto_exist',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    descripcion:{
        type:DataTypes.STRING,
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
    },
    merma_c:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    },
    total:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    almacen:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    area_de_venta:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
}
);
