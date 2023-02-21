//leer documentacion de cherrio para html y de request-promise ademas 
// el navegador no permite el modulo require, se debe importar
//el music.html esta llamando de manera correcta el top100Beatpor.js 


const cheerio = require('cheerio');
const request = require('request-promise');
var $$ = cheerio.load(fs.readFileSync('./index.html'));
// import * as cheerio from 'cheerio';
// import * as request from "request-promise";


async function init() {
    // document.getElementById('temas').innerHTML="Este es un nodo de texto";
    // console.log(13);
    const $ = await request({
        url: 'https://www.beatport.com/genre/tech-house/11/top-100',
        transform: body => cheerio.load(body)
    });
    $('.buk-track-meta-parent').each((i, el) => {
        const tracks_text = $(el).text();
        const tracksComplete = tracks_text.replace(/\s+/g, ' ');
        const tracks = $(el).find('span.buk-track-primary-title').text().replace(/\s+/g, ' ');
        const tracksRemixed = $(el).find('span.buk-track-remixed').text().replace(/\s+/g, ' ');
        const tracksArtists = $(el).find('p.buk-track-artists a').text().replace(/\s+/g, ' ');
        const tracksLabels = $(el).find('p.buk-track-labels a').text().replace(/\s+/g, ' ');
        const tracksDate = $(el).find('p.buk-track-released').text().replace(/\s+/g, ' ');

        console.log(i,tracks + ' ' + tracksRemixed + ' ' + tracksArtists + ' ' + tracksLabels + ' ' + tracksDate);
    });
    
};

init();

