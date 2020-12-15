import fs from 'fs'

const file_content = fs.readFileSync('controllerMapper1.json');

let controllerMapper = JSON.parse(file_content.toString());

controllerMapper.import.push(`import ${process.argv[2]} from `+"'"+`./${process.argv[2]}/controller.js` +"';")
controllerMapper.mapper[process.argv[2]] = process.argv[2]


let controllerMapperText = "";

controllerMapper.import.forEach((item)=> {
    controllerMapperText = controllerMapperText.concat(`${item} \n`)
})
controllerMapperText = controllerMapperText.concat(`\n`)

let mapperObject = ""
Object.keys(controllerMapper.mapper).forEach((item)=> {
    mapperObject = mapperObject.concat(`    ${item}: ${item}, \n`)
})

let mapperObjectText = "export const CONTROLLER_MAPPER = {\n" +
    mapperObject +
    "}"
controllerMapperText = controllerMapperText.concat(mapperObjectText)
console.log(controllerMapperText)

fs.writeFileSync('./mapper.js', controllerMapperText)
fs.writeFileSync('./controllerMapper1.json', JSON.stringify(controllerMapper, null, 4))