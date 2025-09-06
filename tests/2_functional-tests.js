const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input: GET /api/convert?input=10L", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });

  test("Convert an invalid input unit: GET /api/convert?input=32gibberish", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32gibberish")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });

  test("Convert an invalid number: GET /api/convert?input=3/2/3kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/2/3kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });

  test("Convert an invalid number AND unit: GET /api/convert?input=3/2/3gibberish", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/2/3gibberish")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test("Convert with no number: GET /api/convert?input=kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      });
  });
});
