'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5555;

const emojiSuggester = require('./src/emoji-suggester');

// body parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

// base route
app.get('/', (req, res) => {
    res.status(200).send('works! 💪👌💯🙌');
});

/**
 * here is where the magic happens.
 * depending on the content it will suggest emojis from text or a URL content.
 */
app.post('/suggest', (req, res) => {
    // check if message starts with url
    const userName = req.body.user_name;
    console.log('yas', req.body);

    const payload = {
        text: 'yo whatzup'
    };

    return (userName !== 'slackbot') ?
        res.status(200).json(payload) :
        res.status(200).end();
});

// listening to server
app.listen(port, () => {
    console.log('listening on port', port);
});
