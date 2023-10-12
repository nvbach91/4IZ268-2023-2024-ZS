const fs = require('fs');
const path = require('path');
const axios = require('axios');
const bluebird = require('bluebird');

const ensureDirectoryExistence = (filePath) => {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

const urls = [
    // 'https://eso.vse.cz/~pank09/cv03/homework/',
    // 'https://eso.vse.cz/~pank09/cv03/blog/',
    // 'https://eso.vse.cz/~baia04/cv03/homework/',
    // 'https://eso.vse.cz/~baia04/cv03/blog/',
    // 'https://eso.vse.cz/~egea00/cv03/homework/',
    // 'https://eso.vse.cz/~egea00/cv03/blog/',
    // 'https://eso.vse.cz/~mati04/cv03/homework/',
    // 'https://eso.vse.cz/~mati04/cv03/blog/',
    // 'https://eso.vse.cz/~hujl00/cv03/blog/',
    // 'https://eso.vse.cz/~hujl00/cv03/homework/',
    // 'https://eso.vse.cz/~heno00/cv03/homework/',
    // 'https://eso.vse.cz/~heno00/cv03/blog/',
    // 'https://eso.vse.cz/~peta25/cv03/homework/',
    // 'https://eso.vse.cz/~peta25/cv03/blog/',
    // 'https://eso.vse.cz/~juha00/cv03/homework/',
    // 'https://eso.vse.cz/~juha00/cv03/blog/',
    // 'https://eso.vse.cz/~brud06/cv03/homework/',
    // 'https://eso.vse.cz/~brud06/cv03/blog/',
    // 'https://eso.vse.cz/~kadm09/cv03/homework/',
    // 'https://eso.vse.cz/~kadm09/cv03/blog/',
    // 'https://eso.vse.cz/~knyd00/cv03/homework/',
    // 'https://eso.vse.cz/~knyd00/cv03/blog/',
    // 'https://eso.vse.cz/~mata30/cv03/homework/',
    // 'https://eso.vse.cz/~mata30/cv03/blog/',
    // 'https://eso.vse.cz/~sime06/cv03/homework/',
    // 'https://eso.vse.cz/~sime06/cv03/blog/',
    // 'https://eso.vse.cz/~kask05/cv03/blog/',
    // 'https://eso.vse.cz/~kask05/cv03/homework/',
    // 'https://eso.vse.cz/~zolf00/cv03/homework/',
    // 'https://eso.vse.cz/~zolf00/cv03/blog/',
    // 'https://eso.vse.cz/~lubv00/cv03/homework/',
    // 'https://eso.vse.cz/~lubv00/cv03/blog/',
    // 'https://eso.vse.cz/~talp03/cv03/homework/',
    // 'https://eso.vse.cz/~talp03/cv03/blog/',
    // 'https://eso.vse.cz/~shei03/cv03/blog/',
    // 'https://eso.vse.cz/~shei03/cv03/homework/',
    // 'https://eso.vse.cz/~lanj21/cv03/homework/',
    // 'https://eso.vse.cz/~lanj21/cv03/blog/',
    // 'https://eso.vse.cz/~kvaj02/cv03/homework/',
    // 'https://eso.vse.cz/~kvaj02/cv03/blog/',
    // 'https://eso.vse.cz/~hrak04/cv03/homework/',
    // 'https://eso.vse.cz/~hrak04/cv03/blog/',
    // 'https://eso.vse.cz/~tomo03/cv03/homework/',
    // 'https://eso.vse.cz/~tomo03/cv03/blog/',
    // 'https://eso.vse.cz/~sykv01/cv03/homework/',
    // 'https://eso.vse.cz/~sykv01/cv03/blog/',
    // 'https://eso.vse.cz/~smem09/cv03/homework/',
    // 'https://eso.vse.cz/~smem09/cv03/blog/',
    // 'https://eso.vse.cz/~ruzo03/cv03/Homework/',
    // 'https://eso.vse.cz/~ruzo03/cv03/Blog/',
    // 'https://eso.vse.cz/~stra24/cv03/homework/',
    // 'https://eso.vse.cz/~stra24/cv03/blog/',
    // 'https://eso.vse.cz/~elcs00/cv03/homework/',
    // 'https://eso.vse.cz/~elcs00/cv03/blog/',
    // 'https://eso.vse.cz/~lanm16/cv03/homework/',
    // 'https://eso.vse.cz/~lanm16/cv03/blog/',
    // 'https://eso.vse.cz/~mala24/cv03/homework/',
    // 'https://eso.vse.cz/~mala24/cv03/blog/',
    // 'https://eso.vse.cz/~urbf01/cv03/homework/',
    // 'https://eso.vse.cz/~urbf01/cv03/blog/',
    // 'https://eso.vse.cz/~capm03/cv03/homework/',
    // 'https://eso.vse.cz/~capm03/cv03/blog/',
    // 'https://eso.vse.cz/~shla01/cv03/homework/',
    // 'https://eso.vse.cz/~shla01/cv03/blog/',
    // 'https://eso.vse.cz/~kadv05/cv03/homework/',
    // 'https://eso.vse.cz/~kadv05/cv03/blog/',
    // 'https://eso.vse.cz/~kudj05/cv03/homework/',
    // 'https://eso.vse.cz/~kudj05/cv03/blog/',
    // 'https://eso.vse.cz/~stik05/cv03/homework/',
    // 'https://eso.vse.cz/~stik05/cv03/blog/',
    // 'https://eso.vse.cz/~draj08/cv03/homework/',
    // 'https://eso.vse.cz/~draj08/cv03/blog/',
    // 'https://eso.vse.cz/~lism08/cv03/homework/',
    // 'https://eso.vse.cz/~lism08/cv03/blog/',
    // 'https://eso.vse.cz/~binj02/cv03/homework/',
    // 'https://eso.vse.cz/~binj02/cv03/blog/',
    // 'https://eso.vse.cz/~vanm34/cv03/homework/',
    // 'https://eso.vse.cz/~vanm34/cv03/blog/',
    // 'https://eso.vse.cz/~pavj16/cv03/homework/',
    // 'https://eso.vse.cz/~pavj16/cv03/blog/',
    // 'https://eso.vse.cz/~mald10/cv03/homework/',
    // 'https://eso.vse.cz/~mald10/cv03/blog/',
    // 'https://eso.vse.cz/~kire02/cv03/homework/',
    // 'https://eso.vse.cz/~kire02/cv03/blog/',
    // 'https://eso.vse.cz/~jure01/cv03/homework/',
    // 'https://eso.vse.cz/~jure01/cv03/blog/',
    // 'https://eso.vse.cz/~hore06/cv03/homework/',
    // 'https://eso.vse.cz/~hore06/cv03/blog/',
    // 'https://eso.vse.cz/~vlcj07/cv03/blog/',
    // 'https://eso.vse.cz/~vlcj07/cv03/homework/',
    // 'https://eso.vse.cz/~kadf01/cv03/homework/',
    // 'https://eso.vse.cz/~kadf01/cv03/blog/',
    // 'https://eso.vse.cz/~svaa03/cv03/homework/',
    // 'https://eso.vse.cz/~malj17/cv03/homework/',
    // 'https://eso.vse.cz/~malj17/cv03/blog/',
    // 'https://eso.vse.cz/~zabv04/cv03/homework/',
    // 'https://eso.vse.cz/~zabv04/cv03/blog/',
    // 'https://eso.vse.cz/~mact13/cv03/homework/',
    // 'https://eso.vse.cz/~mact13/cv03/blog/',
    // 'https://eso.vse.cz/~telo00/cv03/homework/',
    // 'https://eso.vse.cz/~telo00/cv03/blog/',
    // 'https://eso.vse.cz/~voze00/cv03/homework/',
    // 'https://eso.vse.cz/~voze00/cv03/blog/',

    // 'https://eso.vse.cz/~trah09/homework/',
    // 'https://eso.vse.cz/~trah09/blog/',
    // 'https://eso.vse.cz/~janj56/du2/homework/',
    // 'https://eso.vse.cz/~janj56/du2/blog/',
    // 'https://eso.vse.cz/~kond12/cv03.1/',
    // 'https://eso.vse.cz/~kond12/blog/',
    // 'https://eso.vse.cz/~auza00/cv_03/homework/',
    // 'https://eso.vse.cz/~auza00/cv_03/blog/',
    // 'https://eso.vse.cz/~bobd03/DU3/',
    // 'https://eso.vse.cz/~bobd03/DU3/blog/',

    // 'https://eso.vse.cz/~sata03/cv03/homework/',
    // 'https://eso.vse.cz/~sata03/cv03/blog/',
    // 'https://eso.vse.cz/~lozd00/cv03/homework/',
    // 'https://eso.vse.cz/~lozd00/cv03/blog/',
    // 'https://eso.vse.cz/~pops01/cv03/homework/',
    // 'https://eso.vse.cz/~pops01/cv03/blog/',
    // 'https://eso.vse.cz/~adad05/cv03/homework/',
    // 'https://eso.vse.cz/~adad05/cv03/blog/',
    // 'https://eso.vse.cz/~vitd05/cv03/homework/',
    // 'https://eso.vse.cz/~biko00/cv03/blog/',
    // 'https://eso.vse.cz/~biko00/cv03/homework/',
    // 'https://eso.vse.cz/~mikj18/cv03/homework/',
    // 'https://eso.vse.cz/~mikj18/cv03/blog/',
    // 'https://eso.vse.cz/~janm53/cv03/homework/',
    // 'https://eso.vse.cz/~janm53/cv03/blog/',

    'https://eso.vse.cz/~curm01/cv03/homework/',
    'https://eso.vse.cz/~curm01/cv03/blog/',
    'https://eso.vse.cz/~burl09/cv03/homework/',
    'https://eso.vse.cz/~burl09/cv03/blog/',
    'https://eso.vse.cz/~mata29/cv03/homework/',
    'https://eso.vse.cz/~mata29/cv03/blog/',
].map((url) => {
    if (url.endsWith('.html')) {
        return url;
    }
    return `${url.endsWith('/') ? url : `${url}/`}index.html`;
});

bluebird.each(urls, (url) => {
    return axios.get(url).then((resp) => {
        const filePath = `./${url.split('/').slice(3).join('/').slice(1).replace('cv03/', '')}`;
        ensureDirectoryExistence(filePath);
        fs.writeFileSync(filePath, resp.data);
        const cssHtmlLine = resp.data.split(/[\r\n]+/).filter((line) => line.includes('rel="stylesheet"') && line.includes('.css"')).map((line) => line.trim());
        const cssLinkHref = cssHtmlLine.join('').replace(/^.*href="/g, '').replace(/\.css.*$/, '.css');
        const cssFileUrl = `${url.replace('index.html', '')}${cssLinkHref}`;
        // console.log(cssFileUrl);
        return axios.get(cssFileUrl).then((resp) => {
            const cssFilePath = filePath.replace('index.html', cssLinkHref);
            ensureDirectoryExistence(cssFilePath);
            // console.log(cssFilePath);
            fs.writeFileSync(cssFilePath, resp.data);
        });
    }).catch((err) => {
        console.log(url, err.message);
    });
});

