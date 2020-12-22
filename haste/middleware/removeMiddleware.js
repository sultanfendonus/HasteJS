#!/usr/bin/env node

import {frameworkName} from "../constant/general.js";
import shell from "shelljs";
import fs from "fs";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";

//Little style
clear();
console.log(
    chalk.yellow(
        figlet.textSync(frameworkName, { horizontalLayout: 'full' })
    )
);

// isLoggedIn Middleware can not be deleted
if(process.argv[2] === 'isLoggedIn'){
    console.log(chalk.red('isLoggedIn Middleware can not be removed!'));
    process.exit(1);
}

//Check a Module Exists or Not
let dir = `./middleware/${process.argv[2]}.js`;
if(!fs.existsSync(dir)){
    console.log(chalk.red('Middleware Not Found!'))
    process.exit(1)
}

const removeMiddleWareFile = ()=> {
    shell.rm('-rf', dir)
}
removeMiddleWareFile();


const removeMiddlewareMapper = ()=> {
    const file_content = fs.readFileSync('./middleware/middlewareMapper.json');

    let middlewareMapper = JSON.parse(file_content.toString());

    // middlewareMapper.import.push(`import ${process.argv[2]} from `+"'"+`./${process.argv[2]}.js` +"';")
    // middlewareMapper.mapper[process.argv[2]] = process.argv[2]

    const index = middlewareMapper.import.indexOf(`import ${process.argv[2]} from `+"'"+`./${process.argv[2]}.js` +"';");
    if (index > -1) {
        middlewareMapper.import.splice(index, 1);
    }

    delete middlewareMapper.mapper[process.argv[2]]

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
    console.log(chalk.green("Middleware Removed Successfully!"));
}

removeMiddlewareMapper();