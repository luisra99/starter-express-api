import{DataTypes} from 'sequelize'
import{sequelize} from '../config/database.js'

export const Merma=sequelize.define('merma',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    costo:{
        type:DataTypes.DECIMAL,
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
    valor:{
        type:DataTypes.DECIMAL,
        allowNull: false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull: false
    },
}
);
