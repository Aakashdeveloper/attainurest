let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe("Testing Rest Api",() => {
    it('Should do users Check',(done)=>{
        chai.request(`http://localhost:9900`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })

    it('Check post Api',(done) => {
        chai.request(`http://localhost:9900`)
        .post('/addUser')
        .send({"_id":23,"name":"testuser","usertype":"test"})
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
})
