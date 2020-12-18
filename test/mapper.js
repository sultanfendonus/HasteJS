import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from "fs";

chai.should();
chai.use(chaiHttp)

let expect = chai.expect;
let assert = chai.assert;

describe("Check Existing of Mapper Files", ()=> {
    describe("Check existing of ControllerMapper",()=> {
        it('should check existing of controllerMapper.js and controllerMapper.json', function (done) {
            const controllerMapperJs = fs.existsSync('./app/controllerMapper.js');
            const controllerMapperJson = fs.existsSync('./app/controllerMapper.json');
            assert.equal(controllerMapperJs && controllerMapperJson, true)
            done()
        });
    })

    describe("Check existing of MiddlewareMapper",()=> {
        it('should check existing of middlewareMapper.js and middlewareMapper.json', function (done) {
            const middlewareMapperJs = fs.existsSync('./middleware/middlewareMapper.js');
            const middlewareMapperJson = fs.existsSync('./middleware/middlewareMapper.json');
            assert.equal(middlewareMapperJs && middlewareMapperJson, true)
            done()
        });
    })
})