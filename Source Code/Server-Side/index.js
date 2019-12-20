const express = require('express');
const app = express();


const routes = require('./Routes/routes')


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(express.json());

app.use('/api',routes)

//a middleware that handles a request that dont have an equivalent route
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.stats = 404;
    next(err);
});

// returning error message
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: { message: err.message }
    });
});

app.listen(5000, () => console.log('Quote API listening on port 5000!'));

