# Database
HasteJs currently supports `MySQL`, `PostgreSQL`, `SQLite` and `MS SQL`.

`MongoDB will be added soon.`

HasteJs uses SQLite as a default database. But, you can
use your appropriate one by changing
your `.env` file.

First, Create a `.env` file on your project root and copy the
whole variable list from `env.example` 
file to your newly created `.env` file.

Now change the following fields as your database reference value -

```dotenv
DB_CLIENT = sqlite
DB_HOSTNAME =
DB_PORT =
DB_NAME =
DB_USER =
DB_PASSWORD =
```
You need to restart the project. Stop the project and start again by
`npm run develop`


### Auto Migration
HasteJs and sequelize automatically manage your database migration
when you changed your model files. So you don't have to worry
about database migration. 

### Manual Migration
If you want to migrate your data manually then you have to follow 
2 steps - 
1. Disable auto migration from `Project Root -> config.js`.
    ```
    export const autoMigration = false;
   ```
2. Follow this documentation https://sequelize.org/master/manual/migrations.html