import fs from "fs";
import shell from "shelljs";

export const copyFile = (sourceDir, desDir)=> {
    fs.copyFileSync(sourceDir, desDir);
    console.log('Config files generated successfully!');
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