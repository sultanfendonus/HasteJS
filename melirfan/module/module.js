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
let sourceDir = `./${frameworkName}/module/routes.json`;
let destinationDir = `./app/${process.argv[2]}/routes.json`;
copyFile(sourceDir, destinationDir);

//replace with module name
shell.sed('-i', 'REPLACE_ME', process.argv[2], destinationDir);

//copy controller.js file
let controllerSourceDir = `./${frameworkName}/module/controller/controller.js`;
let controllerDestinationDir = `./app/${process.argv[2]}/controller.js`;
copyFile(controllerSourceDir, controllerDestinationDir);

//replace with module name
shell.sed('-i', 'REPLACE_ME', process.argv[2], controllerDestinationDir);