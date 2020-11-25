import shell from 'shelljs';
import {copyFile} from "../utils/utils.js";
import {frameworkName} from "../constant/general.js";

const initSequelize = ()=> {
    shell.exec('sequelize init');
    // console.log("db init")
    const sequelizesrcSourcePath = `./${frameworkName}/database/.sequelizerc`;
    const sequelizesrcDestinationPath = './.sequelizerc';
    // copyFile(sequelizesrcSourcePath,sequelizesrcDestinationPath)
}

initSequelize();