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
    'https://eso.vse.cz/~mati04/cv04/task-grid/',
    'https://eso.vse.cz/~mati04/cv04/task-page-layout/',
    'https://eso.vse.cz/~sykv01/cv04/task-grid/',
    'https://eso.vse.cz/~sykv01/cv04/task-page-layout/',
    'https://eso.vse.cz/~bobd03/cv04/task-grid/',
    'https://eso.vse.cz/~bobd03/cv04/task-page-layout/',
    'https://eso.vse.cz/~talp03/cv04/task-page-layout/',
    'https://eso.vse.cz/~talp03/cv04/task-grid/',
    'https://eso.vse.cz/~knyd00/cv04/task-grid/',
    'https://eso.vse.cz/~knyd00/cv04/task-page-layout/',
    'https://eso.vse.cz/~mati04/cv04/task-grid/',
    'https://eso.vse.cz/~kadm09/cv04/task-page-layout/',
    'https://eso.vse.cz/~hujl00/cv04/task-grid/',
    'https://eso.vse.cz/~hujl00/cv04/task-page-layout/',
    'https://eso.vse.cz/~brud06/cv04/task-grid/',
    'https://eso.vse.cz/~brud06/cv04/task-page-layout/',
    'https://eso.vse.cz/~mata30/cv04/task-grid/',
    'https://eso.vse.cz/~mata30/cv04/task-page-layout/',
    'https://eso.vse.cz/~lubv00/cv04/task-grid/',
    'https://eso.vse.cz/~lubv00/cv04/task-page-layout/',
    'https://eso.vse.cz/~lanj21/cv04/task-grid/',
    'https://eso.vse.cz/~lanj21/cv04/task-page-layout/',
    'https://eso.vse.cz/~lism08/cv04/task-page-layout/',
    'https://eso.vse.cz/~lism08/cv04/task-grid/',
    'https://eso.vse.cz/~peta25/cv04/task-grid/',
    'https://eso.vse.cz/~peta25/cv04/task-page-layout/',
    'https://eso.vse.cz/~curm01/cv04/task-grid/',
    'https://eso.vse.cz/~curm01/cv04/task-page-layout/',
    'https://eso.vse.cz/~zolf00/cv04/task-grid/',
    'https://eso.vse.cz/~zolf00/cv04/task-page-layout/',
    'https://eso.vse.cz/~egea00/cv04/task-grid/',
    'https://eso.vse.cz/~egea00/cv04/task-page-layout/',
    'https://eso.vse.cz/~baia04/cv04x/task-grid/',
    'https://eso.vse.cz/~baia04/cv04x/task-page-layout/',
    'https://eso.vse.cz/~kudj05/cv04/task-grid/',
    'https://eso.vse.cz/~kudj05/cv04/task-page-layout/',
    'https://eso.vse.cz/~kvaj02/cv04/task-grid/',
    'https://eso.vse.cz/~kvaj02/cv04/task-page-layout/',
    'https://eso.vse.cz/~svaa03/cv04/task-grid/',
    'https://eso.vse.cz/~svaa03/cv04/task-page-layout/',
    'https://eso.vse.cz/~hore06/cv04/task-grid/',
    'https://eso.vse.cz/~hore06/cv04/task-page-layout/',
    'https://eso.vse.cz/~lanm16/cv04/task-grid/',
    'https://eso.vse.cz/~lanm16/cv04/task-page-layout/',
    'https://eso.vse.cz/~sime06/cv04/task-grid/',
    'https://eso.vse.cz/~sime06/cv04/task-page-layout/',
    'https://eso.vse.cz/~hrak04/cv04/task-grid/',
    'https://eso.vse.cz/~hrak04/cv04/task-page-layout/',
    'https://eso.vse.cz/~stra24/cv04/task-grid/',
    'https://eso.vse.cz/~stra24/cv04/task-page-layout/',
    'https://eso.vse.cz/~kuzd02/cv04/task-grid/',
    'https://eso.vse.cz/~kuzd02/cv04/task-page-layout/',
    'https://eso.vse.cz/~shei03/cv04/task-grid/',
    'https://eso.vse.cz/~shei03/cv04/task-page-layout/',
    'https://eso.vse.cz/~vlcj07/cv04/task-grid/',
    'https://eso.vse.cz/~vlcj07/cv04/task-page-layout/',
    'https://eso.vse.cz/~mact13/cv04/task-grid/',
    'https://eso.vse.cz/~mact13/cv04/task-page-layout/',
    'https://eso.vse.cz/~pank09/cv04/task-grid/',
    'https://eso.vse.cz/~pank09/cv04/task-page-layout/',
    'https://eso.vse.cz/~mala24/cv04/task-grid/',
    'https://eso.vse.cz/~mala24/cv04/task-page-layout/',
    'https://eso.vse.cz/~kadv05/cv04/task-grid/',
    'https://eso.vse.cz/~kadv05/cv04/task-page-layout/',
    'https://eso.vse.cz/~juha00/cv04/task-grid/',
    'https://eso.vse.cz/~juha00/cv04/task-page-layout/',
    'https://eso.vse.cz/~adad05/cv04/task-grid/',
    'https://eso.vse.cz/~adad05/cv04/task-page-layout/',
    'https://eso.vse.cz/~binj02/cv04/task-grid/',
    'https://eso.vse.cz/~binj02/cv04/task-page-layout/',
    'https://eso.vse.cz/~auza00/cv_04/task-grid/',
    'https://eso.vse.cz/~auza00/cv_04/task-page-layout/',
    'https://eso.vse.cz/~kask05/cv04/task-grid/',
    'https://eso.vse.cz/~kask05/cv04/task-page-layout/',
    'https://eso.vse.cz/~mikj18/cv04/task-page-layout/',
    'https://eso.vse.cz/~mikj18/cv04/task-grid/',
    'https://eso.vse.cz/~pavj12/cv04/task-grid/',
    'https://eso.vse.cz/~pavj12/cv04/task-page-layout/',
    'https://eso.vse.cz/~zabv04/cv04/task-grid/',
    'https://eso.vse.cz/~zabv04/cv04/task-page-layout/',
    'https://eso.vse.cz/~mald10/cv04/task-grid/',
    'https://eso.vse.cz/~mald10/cv04/task-page-layout/',
    'https://eso.vse.cz/~telo00/cv04/task-page-layout/',
    'https://eso.vse.cz/~telo00/cv04/task-grid/',
    'https://eso.vse.cz/~draj08/cv04/task-grid/',
    'https://eso.vse.cz/~draj08/cv04/task-page-layout/',
    'https://eso.vse.cz/~feja02/cv04/task-grid/',
    'https://eso.vse.cz/~feja02/cv04/task-page-layout/',
    'https://eso.vse.cz/~jure01/cv04/task-grid/',
    'https://eso.vse.cz/~jure01/cv04/task-page-layout/',
    'https://eso.vse.cz/~vanm34/cv04/task-grid/',
    'https://eso.vse.cz/~vanm34/cv04/task-page-layout/',
    'https://eso.vse.cz/~kadf01/cv04/task-grid/',
    'https://eso.vse.cz/~kadf01/cv04/task-page-layout/',
    'https://eso.vse.cz/~voze00/cv04/task-grid/',
    'https://eso.vse.cz/~voze00/cv04/task-page-layout/',
    'https://eso.vse.cz/~lozd00/cv04/task-grid/',
    'https://eso.vse.cz/~lozd00/cv04/task-page-layout/',
    'https://eso.vse.cz/~mata29/cv04/task-grid/',
    'https://eso.vse.cz/~mata29/cv04/task-page-layout/',
    'https://eso.vse.cz/~elcs00/cv04/task-grid/',
    'https://eso.vse.cz/~elcs00/cv04/task-page-layout/',
    'https://eso.vse.cz/~sata03/cv04/task-page-layout/',
    'https://eso.vse.cz/~sata03/cv04/task-grid/',
    'https://eso.vse.cz/~pavj16/cv04/task-grid/',
    'https://eso.vse.cz/~pavj16/cv04/task-page-layout/',
    'https://eso.vse.cz/~trah09/cv04/task-grid/',
    'https://eso.vse.cz/~trah09/cv04/task-page-layout/',
    'https://eso.vse.cz/~kire02/cv04/task-page-layout/',
    'https://eso.vse.cz/~kire02/cv04/task-grid/',
    'https://eso.vse.cz/~burl09/cv04/task-grid/',
    'https://eso.vse.cz/~burl09/cv04/task-page-layout/',
    'https://eso.vse.cz/~ruzo03/cv04-grid/',
    'https://eso.vse.cz/~ruzo03/cv04-page-layout/',
    'https://eso.vse.cz/~urbf01/cv04/task-grid/',
    'https://eso.vse.cz/~urbf01/cv04/task-page-layout/',
].map((url) => {
    if (url.endsWith('.html')) {
        return url;
    }
    return `${url.endsWith('/') ? url : `${url}/`}index.html`;
});

bluebird.each(urls, (url) => {
    return axios.get(url).then((resp) => {
        const filePath = `./${url.split('/').slice(3).join('/').slice(1).replace('cv04/', '')}`;
        ensureDirectoryExistence(filePath);
        fs.writeFileSync(filePath, resp.data);
        const cssHtmlLine = resp.data.split(/[\r\n]+/).filter((line) => line.includes('rel="stylesheet"') && line.includes('.css"')).map((line) => line.trim());
        const cssLinkHref = cssHtmlLine.join('').replace(/^.*href="/g, '').replace(/\.css.*$/, '.css');
        // console.log('cssLinkHref', cssLinkHref);
        const cssFileUrl = `${url.replace('index.html', '')}${cssLinkHref}`;
        // console.log('cssFileUrl', cssFileUrl);
        return axios.get(cssFileUrl).then((resp) => {
            const cssFilePath = filePath.replace('index.html', cssLinkHref.startsWith('.') ? cssLinkHref : `./${cssLinkHref}`);
            ensureDirectoryExistence(cssFilePath);
            // console.log(cssFilePath);
            fs.writeFileSync(cssFilePath, resp.data);
        });
    }).catch((err) => {
        console.log(url, err.message);
    });
});

