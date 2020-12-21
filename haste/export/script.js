import fse from 'fs-extra'
import path from "path";

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

exportedFolder.forEach((item)=> {
    const sourceDir = path.join(currentDir, item);
    const destinationDir = path.join(currentDir, `cha-export/${item}`);

    fse.copy(sourceDir, destinationDir, (err)=> {
        if (err){
            console.log(err)
        }else {
            console.log('done')
        }
    })
})

