import fs from "fs";

export const copyFile = (sourceDir, desDir)=> {
    fs.copyFile(sourceDir, desDir, (err) => {
        if (err) throw err;
        console.log('Config file generated successfully!');
    });
}