class Application {
  constructor({ alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя", ignoreCase = true, defaultKeyLength = 5 } = {}) {
    this._alphabet = alphabet.split("");
    this._ignoreCase = ignoreCase;
    this._defaultKeyLength = defaultKeyLength;

    /**
     * Инициализация таблицы Виженера
     */
    // Первая строка
    this._table = [[null, ...this._alphabet]];

    this._alphabet.forEach((letter, i) => {
      if (!this._table[i]) {
        this._table[i] = [];
      }

      let alphabetMoved = 
        Utils.moveArray(Utils.copy(this._alphabet), Utils.MoveType.Left, i);

      this._table[i].push(letter, ...alphabetMoved);
    })

    let helloMessage = `Приложение инициализировано.<br>`;
    helloMessage += `Алфавит: "${alphabet}",<br>`;
    helloMessage += `${ignoreCase ? "Включен игнор регистра" : "Выключен игнор регистра"}, длина генерации ключа: ${defaultKeyLength}`;

    Utils.setInfo(helloMessage);
  }

  /**
   * 
   * @param {String} message 
   * @param {String} key 
   */
  encrypt(message, key = "") {
    message = this.removeNoAlphabetSymbols(message);
    key = this.removeNoAlphabetSymbols(key);

    if (!key || key.length == 0) {
      key = this._generateKey();
    } else {
      key = this.removeNoAlphabetSymbols(key);
    }

    key = this._formKey(message.length, key);

    return { message: this._encryptMessage(message, key), key};
  }

  _encryptMessage(message, key) {
    let messageOut = "";

    for (let i = 0; i < message.length; i++) {
      let y = this._table[0].indexOf(message.charAt(i)) % this._alphabet.length;
      let x = this._table[0].indexOf(key.charAt(i));

      messageOut += this._table[y][x];
    }

    return messageOut;
  }

  decrypt(message, key) {
    if (!key) {
      console.error(`Can't decrypt. No key provided.`)
      return null;
    }

    message = this.removeNoAlphabetSymbols(message);
    key = this.removeNoAlphabetSymbols(key);

    if (key.length < message.length) {
      key = this._formKey(message.length, key);
    }

    return { message: this._decryptMessage(message, key), key };
  }

  getAlphabet() {
    return this._alphabet;
  }

  _decryptMessage(message, key) {
    let messageOut = "";

    for (let i = 0; i < message.length; i++) {
      let y = this._table[0].slice(1).indexOf(key.charAt(i));

      console.log(key)
      let x = (this._table[y].indexOf(message.charAt(i)) + this._alphabet.length) % this._alphabet.length;

      if (x - 1 <= 0) {
        x = this._alphabet.length;
      } else {
        x -= 1;
      }

      messageOut += this._table[0][x];
    }

    return messageOut;
  }

  _generateKey() {
    let key = "";
    while (key.length < this._defaultKeyLength) {
      key += this._alphabet[Utils.getRandomInt(0, this._alphabet.length)]
    }
    return key;
  }

  _formKey(length, keyBase) {
    let formedKey = "";

    for (let i = 0; i < length; i++) {
      formedKey += keyBase.charAt(i % keyBase.length);
    }

    return formedKey;
  }

  removeNoAlphabetSymbols(message) {
    let outMessage = "";

    message.split("").forEach((symbol) => {
      let formedSymbol = this._getSymbolIfExistInAlphabet(symbol);
      if (formedSymbol) {
        outMessage += formedSymbol;
      }
    })

    return outMessage;
  }

  _getSymbolIfExistInAlphabet(symbol) {
    if (this._alphabet.includes(symbol)) {
      return symbol;
    }

    if (this._ignoreCase) {
      if (this._alphabet.includes(symbol.toLowerCase())) {
        return symbol.toLowerCase();
      }

      if (this._alphabet.includes(symbol.toUpperCase())) {
        return symbol.toUpperCase();
      }
    }
  }
}