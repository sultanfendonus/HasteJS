import {sequelize} from "../../database/index.js";

export const Model = sequelize.define('Category', {
    // Model attributes are defined here
    // This are example attributes. please change as you want.
    // visit https://sequelize.org/master/manual/model-basics.html for details.

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
