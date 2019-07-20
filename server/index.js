const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3010;

const clientId = '94399eee066e2997c7bd';
const clientSecret = 'c77cc724acf63342e43b43e4d1f5d7a3eceda53e';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/getaccesstoken', (request, response) => {
    const { code } = request.body;

    fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        })
    })
    .then(res => response.json(res.json()))
});

app.listen(port, error => {
    if(error) console.log('We fucked up');

    console.log(`server listening on ${port}`);
})