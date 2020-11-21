import fs from "fs";
import shell from "shelljs";

export const copyFile = (sourceDir, desDir)=> {
    fs.copyFile(sourceDir, desDir, (err) => {
        if (err) throw err;
        console.log('Config file generated successfully!');
    });
}

export const readContent = (file) => {
    var buffer = fs.readFileSync(file);
    return buffer;
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