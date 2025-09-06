function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    const match = input.match(/^[\d.\/]+/); // get numeric part

    if (!match) return 1; // no number given, default to 1

    const numStr = match[0];
    const parts = numStr.split("/");

    if (parts.length > 2) return undefined; // invalid fraction

    if (parts.length === 2) {
      result = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      result = parseFloat(parts[0]);
    }

    return result;
  };

  this.getUnit = function (input) {
    const match = input.match(/[a-zA-Z]+$/); // get unit part
    if (!match) return undefined;

    const unit = match[0].toLowerCase();

    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    if (validUnits.includes(unit)) {
      // normalize 'l' to uppercase 'L' (as required)
      return unit === "l" ? "L" : unit;
    }

    return undefined;
  };

  this.getReturnUnit = function (initUnit) {
    const map = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return map[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const names = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return names[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        return undefined; // ← Prevents .toFixed() on undefined
    }

    return parseFloat(result.toFixed(5)); // only round if result is valid
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitFull = this.spellOutUnit(initUnit);
    const returnUnitFull = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitFull} converts to ${returnNum} ${returnUnitFull}`;
  };
}

module.exports = ConvertHandler;
