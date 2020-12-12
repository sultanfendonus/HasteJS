#!/usr/bin/env node

import fs from 'fs';
import shell from 'shelljs'
import clear from 'clear'
import chalk from "chalk"
import figlet from 'figlet'
import {frameworkName} from "../constant/general.js";
import {copyFile, isDuplicate} from "../utils/utils.js";
import {capitalizeFirstLetter} from "../utils/utils.js";

//Little style
clear();
console.log(
    chalk.yellow(
        figlet.textSync(frameworkName, { horizontalLayout: 'full' })
    )
);

//CREATE A NEW DIRECTORY DEFINE FROM ARGS.
let dir = `./app/${process.argv[2]}`;
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const copyAndReplaceRouteFile = ()=> {
    //copy routes.json file
    const sourceDir = `./${frameworkName}/module/routes.json`;
    const destinationDir = `./app/${process.argv[2]}/routes.json`;
    copyFile(sourceDir, destinationDir);

    //replace with module name
    shell.sed('-i', 'REPLACE_ME', process.argv[2], destinationDir);
}

copyAndReplaceRouteFile();

const copyAndReplaceControllerFile = ()=> {
    //copy controller.js file
    const controllerSourceDir = `./${frameworkName}/module/controller/controller.js`;
    const controllerDestinationDir = `./app/${process.argv[2]}/controller.js`;
    copyFile(controllerSourceDir, controllerDestinationDir);

    //replace with module name
    shell.sed('-i', 'REPLACE_ME', process.argv[2], controllerDestinationDir);
    shell.sed('-i', 'UPPER', capitalizeFirstLetter(process.argv[2]), controllerDestinationDir);
}

copyAndReplaceControllerFile();


const generateControllerMapper = ()=> {
    //ADD IMPORT IN CONTROLLER MAPPER
    const importText = `import ${process.argv[2]} from "../../../app/${process.argv[2]}/controller.js";
//IMPORT`
    const keyValue = `${process.argv[2]}: ${process.argv[2]},
    //CONTROLLERS`

    const mapperPath = `./${frameworkName}/module/controller/mapper.js`
    if(!isDuplicate(mapperPath,importText)){
        shell.sed('-i', '//IMPORT', importText, mapperPath);
    }
    if(!isDuplicate(mapperPath, keyValue)){
        shell.sed('-i', '//CONTROLLERS', keyValue, mapperPath);
    }
}

generateControllerMapper();


const copyAndReplaceModelFile = ()=> {
    //copy model.js file
    const modelSourceDir = `./${frameworkName}/module/database/model.js`;
    const modelDestinationDir = `./app/${process.argv[2]}/model.js`;
    copyFile(modelSourceDir, modelDestinationDir);

    //replace model.js with module name
    shell.sed('-i', 'REPLACE_ME', capitalizeFirstLetter(process.argv[2]), modelDestinationDir);
}

copyAndReplaceModelFile();




