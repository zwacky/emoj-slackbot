'use strict';

const got = require('got');
const Uri = require('jsuri');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.SECRET;

function sendOauthAccess(code) {
    const url = new Uri('https://slack.com/api/oauth.access')
        .addQueryParam('client_id', CLIENT_ID)
        .addQueryParam('client_secret', CLIENT_SECRET)
        .addQueryParam('code', code);
    return got(url);
}

module.exports = {
    sendOauthAccess
};