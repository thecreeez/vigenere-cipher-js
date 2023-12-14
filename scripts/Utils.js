class Utils {
  static MoveType = {
    Left: "left",
    Right: "right"
  }

  /**
   * @returns {Array}
   */
  static moveArray(array, type, steps) {
    if (type != Utils.MoveType.Left && type != Utils.MoveType.Right) {
      return console.error(`Неправильный тип. Используйте: Utils.MoveType.Right/Left`);
    }

    if (array.length > 1) {
      for (let i = 0; i < steps; i++) {
        switch (type) {
          case Utils.MoveType.Left: array.push(array.shift()); break;
          case Utils.MoveType.Right: array.unshift(array.pop()); break;
        }
      }
    }

    return array;
  }

  /**
   * Not deep copy array
   * @param {Array} array 
   * @returns {Array} 
   */
  static copy(array) {
    return [...array];
  }

  static getRandomInt(min, max) {
    let rand = min + Math.random() * (max - min);

    return Math.floor(rand);
  }

  static setInfo(data) {
    if (document.getElementById("applicationInfo")) {
      document.getElementById("applicationInfo").innerHTML = data;
    }
  }

  static unitTest(application, message, key) {
    let bSuccess = application.removeNoAlphabetSymbols(message) == application.decrypt(application.encrypt(message, key).message, key).message;

    console.log(`Test: message: ${message}. key: ${key}. Success: ${bSuccess}`, application.getAlphabet())
  }
}