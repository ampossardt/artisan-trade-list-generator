const fetch = require('node-fetch');
const { constants } = require('./tools/constants.js');
const Github = require('./tools/github.js');
const { getHtml, getCss } = require('./tools/render');

module.exports = (app) => {
  // Requests an access token from GitHub based on access code sent back to client-side code
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

  // Gets user information about the currently logged-in user
  app.get('/user', (request, response) => {
    Github.getUser(request.headers.authorization)
      .then(data => response.json(data));
  });

  // Creates or updates a Gist in GitHub of the currently logged-in user
  app.put('/gist', (request, response) => {
    const { data, username } = request.body;
    const escaped = JSON.stringify(data);
    const { authorization } = request.headers;
    
    Github.getGists(authorization, username)
        .then(gists => {
            const gist = gists.find(gist => gist.description === constants.gistDescription);

            if(!gist) {
                Github.createGist(authorization, escaped)
                    .then(data => {
                        response.sendStatus(201);
                    })
                    .catch(error => {
                        console.error(error);
                        response.sendStatus(500);
                    });
            } else {
                Github.updateGist(authorization, gist.id, escaped)
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

    Github.getGists(authorization, username)
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

  // Check for the existance of the specific public repository used for GitHub Pages hosting
  app.get('/export/check-repo', (request, response) => {
    const { authorization } = request.headers;
    const { username } = request.query;

    Github.getPublicRepositories(authorization, username)
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

  // Creates a public repository for GitHub Pages
  app.post('/export/create-repo', (request, response) => {
    const { authorization } = request.headers;
    const { username } = request.body;

    Github.createRepo(authorization, username)
        .then(data => {
            if(data) {
                return response.sendStatus(200);
            } else {
                return response.sendStatus(500);
            }
        })
        .catch(error => response.status(500).send({ error }));
  });

  // Creates tree and commit with latest files based on GitHub Gist with layout/color data,
  // then points HEAD to that commit
  app.post('/export/upload', (request, response) => {
    const { authorization } = request.headers;
    const { username } = request.body;
    console.log(username);

    Github.getLayoutGist(authorization, username)
        .then(gist => Github.getGistData(gist.files['artisan-wants.json'].raw_url))
        .then(data => { 
            return Promise.all([
                Github.createBlob(authorization, username, getHtml(username, data.username, data.layout)),
                getCss(data.colors).then(css => {
                    return Github.createBlob(authorization, username, css);
                })
            ]);
        })
        .then(values => {
            const htmlBlob = values[0];
            const cssBlob = values[1];

            return Github.commitFiles(authorization, username, htmlBlob.sha, cssBlob.sha)
                .then(res => {
                    response.sendStatus(200);
                });
        })
        .catch(error => {
            console.error(error);
            response.sendStatus(500);
        })
  });
}