const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  generateKey(message, key) {
    let keyRepeated = key.repeat(Math.ceil(message.length / key.length)).toUpperCase();
    return keyRepeated.slice(0, message.length);
  }

  shiftAlphabet(shift) {
    return this.alphabet.slice(shift) + this.alphabet.slice(0, shift);
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let keyRepeated = this.generateKey(message, key);
    let encrypted = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      let letter = message[i];

      if (this.alphabet.includes(letter)) {
        let shift = this.alphabet.indexOf(keyRepeated[j]);
        let shiftedAlphabet = this.shiftAlphabet(shift);
        let encryptedLetter = shiftedAlphabet[this.alphabet.indexOf(letter)];

        encrypted += encryptedLetter;
        j++;
      } else {
        encrypted += letter;
      }
    }

    return this.direct ? encrypted : encrypted.split('').reverse().join('');
  }

  decrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let keyRepeated = this.generateKey(message, key);
    let decrypted = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      let letter = message[i];

      if (this.alphabet.includes(letter)) {
        let shift = this.alphabet.indexOf(keyRepeated[j]);
        let shiftedAlphabet = this.shiftAlphabet(shift);
        let decryptedLetter = this.alphabet[shiftedAlphabet.indexOf(letter)];

        decrypted += decryptedLetter;
        j++;
      } else {
        decrypted += letter;
      }
    }

    return this.direct ? decrypted : decrypted.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
