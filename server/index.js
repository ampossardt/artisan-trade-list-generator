const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { constants } = require('./tools/constants.js');
const { getGists, createGist, updateGist, getUser, getPublicRepositories, createRepo, getGistData, getLayoutGist, createBlob, commitFiles } = require('./tools/github.js');
const { getHtml, getCss } = require('./tools/render');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
  next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Endpoint that requests an access token from github based on a provided authorization code via OAuth
// which is provided client side
app.post('/getaccesstoken', (request, response) => {
    const { code } = request.body;

    fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.OAUTH_ID,
            client_secret: process.env.OAUTH_SECRET,
            code: code
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        response.json(data);
    });
});

// Endpoint that gets information about the logged-in user
app.get('/user', (request, response) => {
    const { authorization } = request.headers;
    console.log(constants);

    getUser(authorization)
    .then(({ avatar_url, email, login, html_url }) => 
        response.json({
            avatar_url,
            email,
            login,
            html_url
        })
    );
});

app.put('/gist', (request, response) => {
    const { data, username } = request.body;
    const escaped = JSON.stringify(data);
    const { authorization } = request.headers;
    
    getGists(authorization, username)
        .then(gists => {
            const gist = gists.find(gist => gist.description === constants.gistDescription);

            if(!gist) {
                createGist(authorization, escaped)
                    .then(data => {
                        response.sendStatus(201);
                    })
                    .catch(error => {
                        console.error(error);
                        response.sendStatus(500);
                    });
            } else {
                updateGist(authorization, gist.id, escaped)
                    .then(data => {
                        response.sendStatus(200);
                    })
                    .catch(error => {
                        console.error(error);
                        response.sendStatus(500);
                    });
            }
        })
        .catch(error => console.error);
});

app.get('/gist', (request, response) => {
    const { authorization } = request.headers;
    const { username } = request.query;
    console.log(request.query);

    getGists(authorization, username)
        .then(gists => {
            const gist = gists.find(gist => gist.description === constants.gistDescription);

            if(!gist) {
                response.sendStatus(204);
            } else {
                fetch(gist.files['artisan-wants.json'].raw_url)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        response.send({
                            data
                        });
                    });
            }
        });
});

app.get('/export/check-repo', (request, response) => {
    const { authorization } = request.headers;
    const { username } = request.query;

    getPublicRepositories(authorization, username)
        .then(repos => {
            const repo = repos.find(repo => repo.name === `${username}.github.io`);

            if(!repo) {
                response.sendStatus(404);
            } else {
                response.sendStatus(200);
            }
        })
        .catch(error => response.status(500).send({ error }));
});

app.post('/export/create-repo', (request, response) => {
    const { authorization } = request.headers;
    const { username } = request.body;

    createRepo(authorization, username)
        .then(data => {
            if(data) {
                return response.sendStatus(200);
            } else {
                return response.sendStatus(500);
            }
        })
        .catch(error => response.status(500).send({ error }));
});

app.post('/export/upload', (request, response) => {
    const { authorization } = request.headers;
    const { username } = request.body;
    console.log(username);

    getLayoutGist(authorization, username)
        .then(gist => getGistData(gist.files['artisan-wants.json'].raw_url))
        .then(data => { 
            return Promise.all([
                createBlob(authorization, username, getHtml(username, data.username, data.layout)),
                getCss(data.colors).then(css => {
                    return createBlob(authorization, username, css);
                })
            ]);
        })
        .then(values => {
            const htmlBlob = values[0];
            const cssBlob = values[1];

            return commitFiles(authorization, username, htmlBlob.sha, cssBlob.sha)
                .then(res => {
                    response.sendStatus(200);
                });
        })
        .catch(error => {
            console.error(error);
            response.sendStatus(500);
        })
})

app.listen(process.env.PORT, error => {
    console.log(`server listening on ${process.env.PORT}`);
});