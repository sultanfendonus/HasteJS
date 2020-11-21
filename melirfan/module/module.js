import fs from 'fs';
import shell from 'shelljs'
import {frameworkName} from "../constant/general.js";
import {copyFile} from "../utils/utils.js";

//CREATE A NEW DIRECTORY DEFINE FROM ARGS.
let dir = `./app/${process.argv[2]}`;
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//copy routes.js file
let sourceDir = `./${frameworkName}/module/routes.js`;
let destinationDir = `./app/${process.argv[2]}/routes.js`;
copyFile(sourceDir, destinationDir)

//replace with module name
shell.sed('-i', 'REPLACE_ME', process.argv[2], destinationDir);
