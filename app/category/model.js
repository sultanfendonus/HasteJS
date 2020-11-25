import {sequelize} from "../../database/index.js";
import DataTypes from 'sequelize';

export const Model = sequelize.define('Category', {
    // Model attributes are defined here
    // This are example attributes. please change as you want.
    // visit https://sequelize.org/master/manual/model-basics.html for details.

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});
