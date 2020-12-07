import {sequelize} from "../../database/index.js";
import DataTypes from 'sequelize';

export const Model = sequelize.define('User', {
    // Model attributes are defined here
    // This are example attributes. please change as you want.
    // visit https://sequelize.org/master/manual/model-basics.html for details.

    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // Other model options go here
    defaultScope: {
        attributes: { exclude: [''] },
    },
    scopes: {
        withoutPassword: {
            attributes: {exclude: ['password']},
        }
    }
});