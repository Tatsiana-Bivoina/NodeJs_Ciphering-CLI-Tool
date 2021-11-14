export function atbashCipher(chunk) {
  let out = '';
  const lowerAlphabet = ['97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122'];
  const upperAlphabet = ['65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90'];
  for(let i = 0; i < chunk.length; i++) {
    let code = chunk.charCodeAt(i);
    if(code >= 97 && code <= 122) {
      out += String.fromCharCode(lowerAlphabet[25 - (lowerAlphabet.indexOf(code.toString()))]);
    } else if(code >= 65 && code <= 90) {
      out += String.fromCharCode(upperAlphabet[25 - upperAlphabet.indexOf(code.toString())]);
    } else {
      out += String.fromCharCode(code);
    }
  }
  return chunk = out;
}