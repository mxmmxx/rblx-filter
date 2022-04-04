const { cookie } = require('./config.json');
const superagent = require('superagent');

let CSRF_TOKEN = '';

const filterText = async text => new Promise(resolve => {
    superagent('POST', 'https://develop.roblox.com/v1/gameUpdateNotifications/filter')
        .set('content-type', 'application/json')
        .set('x-csrf-token', CSRF_TOKEN)
        .set('cookie', `.ROBLOSECURITY=${cookie}`)
        .send(`\"${text.replace(/"/g, '\\"')}\"`)
        .then(resp => {
            const { body } = resp;
            if (!body) return resolve(null);

            resolve( body.filteredGameUpdateText );
        })
        .catch(async error => {
            if (!error.response || !error.response.body)
                return resolve(null);

            const { body } = error.response;
            if (!body.errors || body.errors.length < 1)
                return resolve(null);

            const errorMessage = body.errors[0].message;
            if (errorMessage === 'Token Validation Failed') {
                CSRF_TOKEN = error.response.headers['x-csrf-token'];
                return resolve(await filterText(text))
            } else return resolve(null);
        })
})

module.exports = filterText;
