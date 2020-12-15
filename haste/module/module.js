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
    const file_content = fs.readFileSync('./app/controllerMapper.json');

    let controllerMapper = JSON.parse(file_content.toString());

    controllerMapper.import.push(`import ${process.argv[2]} from `+"'"+`./${process.argv[2]}/controller.js` +"';")
    controllerMapper.mapper[process.argv[2]] = process.argv[2]

    let controllerMapperText = "";

    controllerMapper.import.forEach((item)=> {
        controllerMapperText = controllerMapperText.concat(`${item} \n`)
    })
    controllerMapperText = controllerMapperText.concat(`\n`)

    let mapperObject = ""
    Object.keys(controllerMapper.mapper).forEach((item)=> {
        mapperObject = mapperObject.concat(`    ${item}: ${item}, \n`)
    })

    let mapperObjectText = "export const CONTROLLER_MAPPER = {\n" +
        mapperObject +
        "}"
    controllerMapperText = controllerMapperText.concat(mapperObjectText)

    fs.writeFileSync('./app/controllerMapper.js', controllerMapperText)
    fs.writeFileSync('./app/controllerMapper.json', JSON.stringify(controllerMapper, null, 4))
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




