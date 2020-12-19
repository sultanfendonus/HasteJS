import dotenv from 'dotenv'
dotenv.config()

export const dbConfig = {
    settings: {
        client: process.env.DB_CLIENT || 'sqlite', /* one of 'sqlite' | 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        host: process.env.DB_HOSTNAME || '127.0.0.1',
        port: process.env.DB_PORT || '5432',
        database: process.env.DB_NAME || 'haste',
        username: process.env.DB_USER || 'haste',
        password: process.env.DB_PASSWORD || '',
    }
}