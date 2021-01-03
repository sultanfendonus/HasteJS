#!/usr/bin/env node

import {frameworkName} from "../constant/general.js";
import {capitalizeFirstLetter, copyFile, isDuplicate} from "../utils/utils.js";
import shell from "shelljs";
import fs from "fs";
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";


//Little style
clear();
console.log(
    chalk.yellow(
        figlet.textSync(frameworkName, { horizontalLayout: 'full' })
    )
);

// Get middleware name
let middlewareName = process.argv[2];
middlewareName = middlewareName.toLowerCase();

const copyAndReplaceMiddlewareFile = ()=> {
    //copy controller.js file
    const sourceDir = `./${frameworkName}/middleware/middleware.js`;
    const destinationDir = `./middleware/${middlewareName}.js`;
    copyFile(sourceDir, destinationDir, 'Middleware File');

    //replace with module name
    shell.sed('-i', 'MIDDLEWARE_NAME', middlewareName, destinationDir);
}

const generateMiddlewareMapper = ()=> {
    const file_content = fs.readFileSync('./middleware/middlewareMapper.json');

    let middlewareMapper = JSON.parse(file_content.toString());

    middlewareMapper.import.push(`import ${middlewareName} from `+"'"+`./${middlewareName}.js` +"';")
    middlewareMapper.mapper[middlewareName] = middlewareName

    let middlewareMapperText = "";

    middlewareMapper.import.forEach((item)=> {
        middlewareMapperText = middlewareMapperText.concat(`${item} \n`)
    })
    middlewareMapperText = middlewareMapperText.concat(`\n`)

    let mapperObject = ""
    Object.keys(middlewareMapper.mapper).forEach((item)=> {
        mapperObject = mapperObject.concat(`    ${item}: ${item}, \n`)
    })

    let mapperObjectText = "export const MIDDLEWARE_MAPPER = {\n" +
        mapperObject +
        "}"
    middlewareMapperText = middlewareMapperText.concat(mapperObjectText)

    fs.writeFileSync('./middleware/middlewareMapper.js', middlewareMapperText)
    fs.writeFileSync('./middleware/middlewareMapper.json', JSON.stringify(middlewareMapper, null, 4))
}

copyAndReplaceMiddlewareFile();
generateMiddlewareMapper();