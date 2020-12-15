#!/usr/bin/env node

import {frameworkName} from "../constant/general.js";
import {capitalizeFirstLetter, copyFile, isDuplicate} from "../utils/utils.js";
import shell from "shelljs";
import fs from "fs";


const copyAndReplaceMiddlewareFile = ()=> {
    //copy controller.js file
    const sourceDir = `./${frameworkName}/middleware/middleware.js`;
    const destinationDir = `./middleware/${process.argv[2]}.js`;
    copyFile(sourceDir, destinationDir);

    //replace with module name
    shell.sed('-i', 'MIDDLEWARE_NAME', process.argv[2], destinationDir);
}

const generateMiddlewareMapper = ()=> {
    const file_content = fs.readFileSync('./middleware/middlewareMapper.json');

    let middlewareMapper = JSON.parse(file_content.toString());

    middlewareMapper.import.push(`import ${process.argv[2]} from `+"'"+`./${process.argv[2]}.js` +"';")
    middlewareMapper.mapper[process.argv[2]] = process.argv[2]

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