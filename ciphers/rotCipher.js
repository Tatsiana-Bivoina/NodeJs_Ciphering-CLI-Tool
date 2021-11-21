function rotCipher(chunk, cipher) {
  if(cipher == 'R1') return encodeRot(chunk);
  else return decodeRot(chunk);
}

function encodeRot(chunk) {
  let offSet = 8;
  let out = '';
  for(let i = 0; i < chunk.length; i++) {
    let code = chunk.charCodeAt(i);
    if(code >= 65 && code <= 90) {
      if(code + offSet <= 90) {
        code = code + offSet;
      } else {
        code = code + offSet - 90 + 64;
      }
      out += String.fromCharCode(code);
    }
    else if(code >= 97 && code <= 122) {
      if(code + offSet <= 122) {
        code = code + offSet;
      } else {
        code = code + offSet - 122 + 96;
      }
      out += String.fromCharCode(code);
    }
    else {
      out += String.fromCharCode(code);
    }
  }
  return chunk = out;
}

function decodeRot(chunk) {
  let offSet = 8;
  let out = '';
  for(let i = 0; i < chunk.length; i++) {
    let code = chunk.charCodeAt(i);
    if(code >= 65 && code <= 90) {
      if(code - offSet >= 65) {
        code = code - offSet;
      } else {
        code = 90 - offSet + (code - 64);
      }
      out += String.fromCharCode(code);
    }
    else if(code >= 97 && code <= 122) {
      if(code - offSet >= 97) {
        code = code - offSet;
      } else {
        code = 122 - offSet + (code - 96);
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
  encodeRot,
  rotCipher,
  decodeRot
};