function caesarCipher(chunk, cipher) {
  if(cipher == 'C1') return encodeCaesar(chunk);
  else return decodeCaesar(chunk);
}

function encodeCaesar(chunk) {
  let out = '';
  for(let i = 0; i < chunk.length; i++) { 
    let code = chunk.charCodeAt(i);
    if(code >= 65 && code <= 90) {
      if(code == 90) {
        code = 65;
      } else {
        code++;
      }
      out += String.fromCharCode(code);
    }
    else if(code >= 97 && code <= 122) {
      if(code == 122) {
        code = 97;
      } else {
        code++;
      }
      out += String.fromCharCode(code);
    }
    else {
      out += String.fromCharCode(code);
    }
  }
  return chunk = out;
}

function decodeCaesar(chunk) {
  let out = '';
  for(let i = 0; i < chunk.length; i++) {
    let code = chunk.charCodeAt(i);
    if(code >= 65 && code <= 90) {
      if(code == 65) {
        code = 90;
      } else {
        code--;
      }
      out += String.fromCharCode(code);
    }
    else if(code >= 97 && code <= 122) {
      if(code == 97) {
        code = 122;
      } else {
        code--;
      }
      out += String.fromCharCode(code);
    }
    else {
      out += String.fromCharCode(code);
    }
  }
  return chunk = out;
}

module.exports = {
  encodeCaesar,
  caesarCipher,
  decodeCaesar
};