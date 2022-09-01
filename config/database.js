import Sequelize from 'sequelize'
export const sequelize = new Sequelize('store','postgres','ok',{
    host:'localhost',
    dialect:'postgres'
});
