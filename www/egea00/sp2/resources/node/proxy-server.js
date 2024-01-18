const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());


app.use('/api', createProxyMiddleware({
    target: 'https://api.api-ninjas.com',
    changeOrigin: true,
    pathRewrite: {
        '^/v1/city?name=': '',
    },
}));

app.use('/openweather', createProxyMiddleware({
    target: 'https://api.openweathermap.org',
    changeOrigin: true,
    pathRewrite: {
        '^/openweather': '',
    },
}));

app.use('/ticketmaster', createProxyMiddleware({
    target: 'https://app.ticketmaster.com',
    changeOrigin: true,
    pathRewrite: {
        '^/ticketmaster': '',
    },
}));

const port = 3000;
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});

