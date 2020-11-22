import fs from 'fs';
import shell from 'shelljs'
import {frameworkName} from "../constant/general.js";
import {copyFile} from "../utils/utils.js";

//CREATE A NEW DIRECTORY DEFINE FROM ARGS.
let dir = `./app/${process.argv[2]}`;
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//copy routes.json file
const sourceDir = `./${frameworkName}/module/routes.json`;
const destinationDir = `./app/${process.argv[2]}/routes.json`;
copyFile(sourceDir, destinationDir);

//replace with module name
shell.sed('-i', 'REPLACE_ME', process.argv[2], destinationDir);

//copy controller.js file
const controllerSourceDir = `./${frameworkName}/module/controller/controller.js`;
const controllerDestinationDir = `./app/${process.argv[2]}/controller.js`;
copyFile(controllerSourceDir, controllerDestinationDir);

//replace with module name
shell.sed('-i', 'REPLACE_ME', process.argv[2], controllerDestinationDir);

//ADD IMPORT IN CONTROLLER MAPPER
const importText = `import ${process.argv[2]} from "../../../app/${process.argv[2]}/controller.js";
//IMPORT`
const keyValue = `${process.argv[2]}: ${process.argv[2]},
    //CONTROLLERS`

const mapperPath = `./${frameworkName}/module/controller/mapper.js`
shell.sed('-i', '//IMPORT', importText, mapperPath);
shell.sed('-i', '//CONTROLLERS', keyValue, mapperPath);

