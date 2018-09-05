const express = require("express");
const bodyParser = require("body-parser");

require("./utils/connect");
const config = require("./config");
const cacheRouter = require("./routes/cache");
const RESTError = require("./utils/rest-error");

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use("/cache/", cacheRouter);

app.use((req, res, next) => {
    throw new RESTError("Not found", 404, module.filename);
})

// Error handler
app.use((err, req, res, next) => {
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

if(!module.parent){
    app.listen(config.port, () => {
        console.log(`SERVER IS STARTED ON PORT: ${config.port}`);
    })
};

module.exports = app;