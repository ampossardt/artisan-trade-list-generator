module.exports.isSuccessStatusCode = (code) => {
  const codeString = code.toString();
  
  return codeString[0] === '2';
}

module.exports.processResponse = (response) => {
  if(response.ok) {
    return response.json();
  } else {
    console.error(response);
    return response.json();
    // throw new Error(response.statusText);
  }
}