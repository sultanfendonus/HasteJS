import Sequelize from 'sequelize';
export const sequelize = new Sequelize('sqlite::memory:')

export const init = async ()=> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
