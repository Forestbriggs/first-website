const http = require('http');
const fs = require('fs');

function getContentType(fileName) {
    const ext = fileName.split(".")[1];
    switch (ext) {
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "webp":
            return "image/webp";
        case "css":
            return "text/css";
        default:
            return "text/plain";
    }
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.method === 'GET' && req.url.startsWith('/assets')) {
        const assetPath = req.url.split('/assets')[1];
        try {
            const resBody = fs.readFileSync("./assets" + assetPath);
            res.statusCode = 200;
            res.setHeader("Content-Type", getContentType(assetPath));
            res.end(resBody);
            return;
        } catch {
            console.error("Cannot find asset", assetPath, "in assets folder");
            res.statusCode = 404;
            res.end();
            return;
        }
    }

    if (req.method === 'GET' && req.url === '/home') {
        let htmlPage = fs.readFileSync('./index.html', 'utf-8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlPage);
        return;
    }

    if (req.method === 'GET' && req.url === '/info') {
        let htmlPage = fs.readFileSync('./info.html', 'utf-8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlPage);
        return;
    }

    if (req.method === 'GET' && req.url === '/links') {
        let htmlPage = fs.readFileSync('./links.html', 'utf-8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlPage);
        return;
    }

    if (req.method === 'GET' && req.url === '/images') {
        let htmlPage = fs.readFileSync('./images.html', 'utf-8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlPage);
        return;
    }


    res.statusCode = 404;
    res.end("Page Not Found");
    return;
});

const port = 5000;

server.listen((port), () => console.log('Successfully started server on port', port));
