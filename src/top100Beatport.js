const cheerio = require('cheerio');
const request = require('request-promise');


async function init() {
    const $ = await request({
        url: 'https://www.beatport.com/genre/tech-house/11/top-100',
        transform: body => cheerio.load(body)
    });

    //writeStream.write('Track|Remixed|Artist|Label|Date|Price\n')

    const pri = $('.buk-track-meta-parent').each((i, el) => {

        const tracks_text = $(el).text();
        const tracksComplete = tracks_text.replace(/\s+/g, ' ');
        const tracks = $(el).find('span.buk-track-primary-title').text().replace(/\s+/g, ' ');
        const tracksRemixed = $(el).find('span.buk-track-remixed').text().replace(/\s+/g, ' ');
        const tracksArtists = $(el).find('p.buk-track-artists a').text().replace(/\s+/g, ' ');
        const tracksLabels = $(el).find('p.buk-track-labels a').text().replace(/\s+/g, ' ');
        const tracksDate = $(el).find('p.buk-track-released').text().replace(/\s+/g, ' ');

        console.log(i,tracks);
    });

    //PRECIOS
    // $('.track-actions').each(function (idx, ele) {
    //     const tracksPrice = $(ele).find('button.add-to-default').html();
    //     console.log(idx, tracksPrice);
    // });
};

init();
