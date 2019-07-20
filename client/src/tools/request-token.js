export function getToken(code) {
  return fetch('http://localhost:3010/getaccesstoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: code
    })
  })
  .then(data => data.json());
}