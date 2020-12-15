import {Sequelize} from 'sequelize';
import {autoSyncDB} from '../config.js'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite',
    logging: false
});

export const syncAll = async ()=> {
    await sequelize.sync({ alter: true });
}

export const init = async ()=> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        autoSyncDB && await syncAll()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
