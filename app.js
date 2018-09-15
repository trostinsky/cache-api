// 1. команда npm start +
// 2. PORT +
// 3. Подключение к БД (mongolab); +

const express = require("express");
const bodyParser = require("body-parser");

require("./utils/connect");
const config = require("./config");
const cacheRouter = require("./routes/cache");
const RESTError = require("./utils/rest-error");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use("/cache/", cacheRouter);
app.use((req, res, next) => {
    throw new RESTError("Not found", 404, module.filename);
})

// Error handler
app.use((err, req, res, next) => {
    if(config.NODE_ENV === 'test'){
        console.log(err)
    }
    if(config.NODE_ENV === 'development'){
        res.status(err.status || 500).json({
            message: err.message,
            stack: err.stack,
            module: err.moduleName
        });
    } else {
        res.status(err.status || 500).json({
            error: err.message,
        });
    }
})

const {PORT = 3000} = process.env;
const {port = PORT} = config;
if(!module.parent){
    app.listen(port, () => {
        console.log(`SERVER IS STARTED ON PORT: ${port}`);
    })
};

module.exports = app;