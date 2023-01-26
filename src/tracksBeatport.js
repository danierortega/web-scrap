
const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs-extra')
const writeStream = fs.createWriteStream('tracks.csv');

async function init() {
    const $ = await request({
        url: 'https://www.beatport.com/genre/tech-house/11',
        transform: body => cheerio.load(body)
    });


    //titulo de la lista de tracks
    // const topTitle = $('.bp-top-ten-title h5');
    // console.log(topTitle.html());

    writeStream.write('Track|Remixed|Author|Label\n')
    
    $('.top-ten-track-meta').each((i,el)=> {
        tracksArray = []
        const tracks_text = $(el).text();
        const tracksComplete = tracks_text.replace(/\s+/g, ' ')
        const tracks = $(el).find('span.top-ten-track-primary-title').text().replace(/\s+/g, ' ');
        const tracksRemixed = $(el).find('span.top-ten-track-remixed').text().replace(/\s+/g, ' ');
        const tracksArtists = $(el).find('span.top-ten-track-artists').text().replace(/\s+/g, ' ');
        const tracksLabels = $(el).find('span.top-ten-track-label').text().replace(/\s+/g, ' ');
        
        $(el).find('.top-ten-track-meta span').each((i,el)=>tracksArray.push($(el).text().replace(/\s+/g, ' ')));
        console.log(tracksArray.join(','));
        //writeStream.write(`${tracks}|${tracksRemixed}|${tracksArtists}|${tracksLabels}\n`);

    })

};
init();