#!/usr/bin/env node

import fs from 'fs';
import shell from 'shelljs'
import clear from 'clear'
import chalk from "chalk"
import figlet from 'figlet'
import {frameworkName} from "../constant/general.js";

//Little style
clear();
console.log(
    chalk.yellow(
        figlet.textSync(frameworkName, { horizontalLayout: 'full' })
    )
);

// User module can not be deleted
if(process.argv[2] === 'user'){
    console.log(chalk.red('User Module can not be removed!'));
    process.exit(1);
}

//Check a Module Exists or Not
let dir = `./app/${process.argv[2]}`;
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

    const index = controllerMapper.import.indexOf(`import ${process.argv[2]} from `+"'"+`./${process.argv[2]}/controller.js` +"';");
    if (index > -1) {
        controllerMapper.import.splice(index, 1);
    }

    delete controllerMapper.mapper[process.argv[2]]

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
    console.log(chalk.green("Module Removed Successfully!"));
}

removeControllerMapper();





