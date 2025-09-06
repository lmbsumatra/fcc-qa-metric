"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input); // 3.1
    const initUnit = convertHandler.getUnit(input); // "mi"
    const returnUnit = convertHandler.getReturnUnit(initUnit); // "km"
    const returnNum = convertHandler.convert(initNum, initUnit); // ~4.98895
    const spellOutInItUnit = convertHandler.spellOutUnit(initUnit);
    const getReturnUnit = convertHandler.getReturnUnit(initUnit);
    const spellOutReturnUnit = convertHandler.spellOutUnit(getReturnUnit);

    if (initNum === undefined && initUnit === undefined) {
  return res.send("invalid number and unit");
} else if (initNum === undefined) {
  return res.send("invalid number");
} else if (initUnit === undefined) {
  return res.send("invalid unit");
}


    return res.send({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: `${initNum} ${spellOutInItUnit} converts to ${returnNum} ${spellOutReturnUnit}`,
    });
  });
};
