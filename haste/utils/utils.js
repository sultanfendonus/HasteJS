import fs from "fs";
import shell from "shelljs";
import chalk from "chalk";

export const copyFile = (sourceDir, desDir, FileName = 'Files')=> {
    fs.copyFileSync(sourceDir, desDir);
    console.log(chalk.green(`${FileName} generated successfully!`));
}

export const readContent = (file) => {
    return fs.readFileSync(file);
}

export const combinedRoutes = ()=> {
    let result=[];
    shell.cd('app');
    shell.ls('./*/routes.json').forEach((file)=> {
        let data = readContent(file);
        result.push(...JSON.parse(data.toString()).routes)
    });
    shell.cd('..');
    return result;
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isDuplicate = (file, string) => {
    const data = fs.readFileSync(file);
    return data.includes(string);

}













