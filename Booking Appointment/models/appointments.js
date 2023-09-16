const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const User=sequelize.define('appointments',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
    },
    date:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports=User;