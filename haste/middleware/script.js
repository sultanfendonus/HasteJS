#!/usr/bin/env node

import {frameworkName} from "../constant/general.js";
import {capitalizeFirstLetter, copyFile, isDuplicate} from "../utils/utils.js";
import shell from "shelljs";


const copyAndReplaceMiddlewareFile = ()=> {
    //copy controller.js file
    const sourceDir = `./${frameworkName}/middleware/middleware.js`;
    const destinationDir = `./middleware/${process.argv[2]}.js`;
    copyFile(sourceDir, destinationDir);

    //replace with module name
    shell.sed('-i', 'MIDDLEWARE_NAME', process.argv[2], destinationDir);
}

const generateMiddlewareMapper = ()=> {
    //ADD IMPORT IN MIDDLEWARE MAPPER
    const importText = `import ${process.argv[2]} from "./${process.argv[2]}.js";
//IMPORT`
    const keyValue = `${process.argv[2]}: ${process.argv[2]},
    //MIDDLEWARES`

    const mapperPath = `./middleware/middlewareMapper.js`
    if(!isDuplicate(mapperPath,importText)){
        shell.sed('-i', '//IMPORT', importText, mapperPath);
    }
    if(!isDuplicate(mapperPath, keyValue)){
        shell.sed('-i', '//MIDDLEWARES', keyValue, mapperPath);
    }
}

copyAndReplaceMiddlewareFile();
generateMiddlewareMapper();