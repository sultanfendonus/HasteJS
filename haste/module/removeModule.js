#!/usr/bin/env node

import fs from 'fs';
import shell from 'shelljs'
import clear from 'clear'
import chalk from "chalk"
import figlet from 'figlet'
import {frameworkName} from "../constant/general.js";
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

// User module can not be deleted
if(moduleName === 'user'){
    console.log(chalk.red('User Module can not be removed!'));
    process.exit(1);
}

//Check a Module Exists or Not
let dir = `./app/${moduleName}`;
if(!fs.existsSync(dir)){
    console.log(chalk.red('Module Not Found!'))
    process.exit(1)
}

const removeDirectory = ()=> {
    shell.rm('-rf', dir)
}
removeDirectory();

const removeControllerMapper = ()=> {
    const file_content = fs.readFileSync('./app/controllerMapper.json');

    let controllerMapper = JSON.parse(file_content.toString());

    const index = controllerMapper.import.indexOf(`import ${moduleName} from `+"'"+`./${moduleName}/controller.js` +"';");
    if (index > -1) {
        controllerMapper.import.splice(index, 1);
    }

    delete controllerMapper.mapper[moduleName]

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

removeControllerMapper();

const removeModelMapper = ()=> {
    const file_content = fs.readFileSync('./database/modelMapper.json');

    let modelMapper = JSON.parse(file_content.toString());

    const index = modelMapper.import.indexOf(`import {Model as ${capitalizeFirstLetter(moduleName)}} from `+"'"+`../app/${moduleName}/model.js` +"';");
    if (index > -1) {
        modelMapper.import.splice(index, 1);
    }

    const objectIndex = modelMapper.export.indexOf(capitalizeFirstLetter(moduleName));
    if (objectIndex > -1) {
        modelMapper.export.splice(objectIndex, 1);
    }

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
    console.log(chalk.green("Module Removed Successfully!"));
}

removeModelMapper();




