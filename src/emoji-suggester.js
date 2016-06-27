'use strict';

const got = require('got');
const cheerio = require('cheerio');
const Uri = require('jsuri');

const DANGO_API = 'http://emoji.getdango.com/api';

function suggestEmojis(text) {
    return got(`${DANGO_API}/emoji`, {
        json: true,
        query: {
            q: text || 'default'
        }
    }).then(response => {
        return response.body.results
            .map(entry => entry.text);
    });
}

/**
 * retrieves the defining content of a site through:
 * - title
 * - h1
 * - meta description
 *
 * the url will be appended with _escaped_fragment_, so sites know it's a crawler on their site #crawlerpolice 👮.
 *
 * @param string url
 */
function suggestEmojisFromUrl(url) {
    const uri = new Uri(url)
        .replaceQueryParam('_escaped_fragment_')
        .toString();
    return got(uri)
        .then(response => {
            const $ = cheerio.load(response.body);
            const text = $('title').text() || $('h1').text() || $('meta[name="description"]').text();
            return suggestEmojis(text);
        });
}

module.exports = {
    suggestEmojis,
    suggestEmojisFromUrl,
};
