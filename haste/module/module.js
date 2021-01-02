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

// Get module name
let moduleName = process.argv[2];
moduleName = moduleName.toLowerCase();

//CREATE A NEW DIRECTORY DEFINE FROM ARGS.
let dir = `./app/${moduleName}`;
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}else {
    console.log(chalk.red('Module already exist! Please create a new module or update existing one from app directory.'))
    process.exit(1)
}

const copyAndReplaceRouteFile = ()=> {
    //copy routes.json file
    const sourceDir = `./${frameworkName}/module/routes.json`;
    const destinationDir = `./app/${moduleName}/routes.json`;
    copyFile(sourceDir, destinationDir, 'Routes File');

    //replace with module name
    shell.sed('-i', 'REPLACE_ME', moduleName, destinationDir);
}

copyAndReplaceRouteFile();

const copyAndReplaceControllerFile = ()=> {
    //copy controller.js file
    const controllerSourceDir = `./${frameworkName}/module/controller/controller.js`;
    const controllerDestinationDir = `./app/${moduleName}/controller.js`;
    copyFile(controllerSourceDir, controllerDestinationDir, 'Controllers File');

    //replace with module name
    shell.sed('-i', 'REPLACE_ME', moduleName, controllerDestinationDir);
    shell.sed('-i', 'UPPER', capitalizeFirstLetter(moduleName), controllerDestinationDir);
}

copyAndReplaceControllerFile();


const generateControllerMapper = ()=> {
    const file_content = fs.readFileSync('./app/controllerMapper.json');

    let controllerMapper = JSON.parse(file_content.toString());

    controllerMapper.import.push(`import ${moduleName} from `+"'"+`./${moduleName}/controller.js` +"';")
    controllerMapper.mapper[moduleName] = moduleName

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
    const modelDestinationDir = `./app/${moduleName}/model.js`;
    copyFile(modelSourceDir, modelDestinationDir, 'Model Files');

    //replace model.js with module name
    shell.sed('-i', 'REPLACE_ME', capitalizeFirstLetter(moduleName), modelDestinationDir);
}

copyAndReplaceModelFile();


const generateModelMapper = ()=> {
    const file_content = fs.readFileSync('./database/modelMapper.json');

    let modelMapper = JSON.parse(file_content.toString());

    modelMapper.import.push(`import {Model as ${capitalizeFirstLetter(moduleName)}} from `+"'"+`../app/${moduleName}/model.js` +"';");
    modelMapper.export.push(capitalizeFirstLetter(moduleName));

    // move the relation import to the last position.
    modelMapper.import.push(modelMapper.import.splice(modelMapper.import.indexOf(`import relation from './relation.js';`), 1)[0]);

    let modelMapperText = "";

    modelMapper.import.forEach((item)=> {
        modelMapperText = modelMapperText.concat(`${item} \n`)
    })
    modelMapperText = modelMapperText.concat(`\n`)

    let exportObject = ""
    modelMapper.export.forEach((item)=> {
        exportObject = exportObject.concat(`${item},`)
    })

    let exportObjectText = "export {" + exportObject +"}"
    modelMapperText = modelMapperText.concat(exportObjectText)

    fs.writeFileSync('./database/modelMapper.js', modelMapperText)
    fs.writeFileSync('./database/modelMapper.json', JSON.stringify(modelMapper, null, 4))
}


generateModelMapper()

