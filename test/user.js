import chai from 'chai';
import chaiHttp from 'chai-http';
import {server} from '../app/index.js'
import fs from "fs";
import faker from 'faker';

chai.should();
chai.use(chaiHttp)

let expect = chai.expect;
let assert = chai.assert;

describe('User API', ()=> {
    describe("User Module found", ()=> {
        it("should find the User module and the child files", (done)=> {
            const route = fs.existsSync('./app/user/routes.json');
            const controller = fs.existsSync('./app/user/controller.js');
            const model = fs.existsSync('./app/user/model.js');
            assert.equal(route && controller && model, true)
            done()
        });
    })
    describe("User API", ()=> {
        describe("GET /user/", ()=> {
            it("should return 401 if I do not put Authorization token", (done)=>{
                chai.request(server)
                    .get("/user/")
                    .end((err, response)=> {
                        response.should.have.status(401)
                        done();
                    })
            })

            it("should return 403 if I put invalid token", (done)=>{
                chai.request(server)
                    .get("/user/")
                    .set("Authorization", 'dummy token+dd')
                    .end((err, response)=> {
                        response.should.have.status(403)
                        done();
                    })
            })

            it("should return array list of users", (done)=> {
                chai.request(server)
                    .get("/user/")
                    .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bHRhbjE2NTJAZ21haWwuY29tIiwidXNlcl9pZCI6MTMsImlhdCI6MTYwNjc5NzU3Nn0.jgI54Nvo0se7v40QqAPFT-fe8FSnkUnUErfW0u6kmXs')
                    .end((err, response)=> {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        done();
                    })
            })
        })

        // describe("User Authentication, POST /user/register", ()=> {
        //     it("should able to register a random generated user", (done)=>{
        //         chai.request(server)
        //             .post("/user/register/")
        //             .send({
        //                 first_name: faker.name.firstName(),
        //                 last_name: faker.name.lastName(),
        //                 email: faker.internet.email(),
        //                 password: "123456"
        //             })
        //             .end((err, response)=> {
        //                 response.should.have.status(201);
        //                 response.body.should.have.property('token');
        //                 done();
        //             })
        //     })

            // it("It should able to be login",  (done)=>{
            //     chai.request(server)
            //         .post('/user/login')
            //         .send({
            //             email: 'sultan1640@gmail.com',
            //             password: '123456'
            //         })
            //         .end((err, response)=> {
            //             console.log(response.body)
            //             response.should.have.status(200)
            //             done();
            //         })
            // })
        // })
    })
})