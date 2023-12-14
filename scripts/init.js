const DECRYPT_INPUT = document.getElementById("decryptInput");
const DECRYPT_BUTTON = document.getElementById("buttonDecrypt");

const ENCRYPT_INPUT = document.getElementById("encryptInput");
const ENCRYPT_BUTTON = document.getElementById("buttonEncrypt");

const KEY_INPUT = document.getElementById("keyInput");

const App = new Application();

DECRYPT_BUTTON.addEventListener('click', (ev) => {
  let data = App.decrypt(DECRYPT_INPUT.value, KEY_INPUT.value);

  Utils.setInfo(`Расшифровано, сообщение: "${data.message}".`)
  KEY_INPUT.value = data.key;
  ENCRYPT_INPUT.value = data.message;
})

ENCRYPT_BUTTON.addEventListener('click', (ev) => {
  let data = App.encrypt(ENCRYPT_INPUT.value, KEY_INPUT.value);

  Utils.setInfo(`Зашифровано, сообщение: "${data.message}". ключ: "${data.key}"`)

  KEY_INPUT.value = data.key;
  DECRYPT_INPUT.value = data.message;
})

Utils.unitTest(App, "120писемвперёд", "пароль");
Utils.unitTest(App, "testmessageночучутьрусского", "стрекоза");
Utils.unitTest(App, "testmessageночучутьрусского", "5крыдбев");
Utils.unitTest(App, "я", "а");