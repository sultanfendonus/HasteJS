import fse from 'fs-extra'
import path from "path";
import fs from "fs";

const exportedFolder = [
    "app",
    "database",
    "haste",
    "middleware",
    "public",
    "test",
    "views",
    ".gitignore",
    "config.js",
    "env.example",
    "package.json",
    "Readme.md"
]

const currentDir = process.cwd();

exportedFolder.forEach((item, index)=> {
    const sourceDir = path.join(currentDir, item);
    const destinationDir = path.join(currentDir, `cha-export/${item}`);

    fse.copy(sourceDir, destinationDir, (err)=> {
        if (err){
            console.log(err)
        }else {
            if(index === exportedFolder.length - 1){
                const packageJonFilePath = path.join(currentDir, 'cha-export/package.json');
                const packageJsonContent = fs.readFileSync(packageJonFilePath);
                let packageJson = JSON.parse(packageJsonContent.toString());
                packageJson.dependencies['hastejs-cli'] = packageJson.version;
                packageJson.name = "packageName";
                delete packageJson.description;
                delete packageJson.repository;
                delete packageJson.bin;
                delete packageJson.author;
                delete packageJson.license;

                fs.writeFileSync(packageJonFilePath, JSON.stringify(packageJson, null, 2));
            }

        }
    })
})

