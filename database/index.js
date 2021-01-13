import Sequelize from 'sequelize';
import {autoMigration} from '../config.js'
import {dbConfig} from "./database.js";
import dotenv from 'dotenv'
dotenv.config()

export let sequelize;

if(dbConfig.settings.client === 'sqlite'){
    sequelize= new Sequelize({
        dialect: 'sqlite',
        storage: 'db/database.sqlite',
        logging: (msg)=> {
            if(!process.env.DB_LOGS || process.env.DB_LOGS === 'false'){
                return false;
            }else {
                return console.log(msg)
            }
        }
    });
}else {
    const {client, host, port, database, username, password} = dbConfig.settings;
    sequelize = new Sequelize(database, username, password, {
        host: `${host}`,
        dialect: client,
        logging: (msg)=> {
            if(!process.env.DB_LOGS || process.env.DB_LOGS === 'false'){
                return false;
            }else {
                return console.log(msg)
            }
        }
    });
}

export const syncAll = async ()=> {
    await sequelize.sync({ alter: true });
}

export const init = async ()=> {
    try {
        await sequelize.authenticate();
        console.log('Connection with database has been established successfully.');
        autoMigration && await syncAll()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
