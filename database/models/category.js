import { Sequelize } from 'sequelize';
import {sequelize} from "../index.js";

export const Category = sequelize.define('Category', {
    // Model attributes are defined here
    title: {
        type: String,
        allowNull: false
    },
    description: {
        type: String
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Category === sequelize.models.User); // true