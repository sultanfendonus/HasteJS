import shell from "shelljs";

shell.cd('admin');
shell.exec('npm start', function (code, stdout, stderr){
    console.log('done');
})