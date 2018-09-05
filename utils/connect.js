const config = require("../config");
const mongoose = require("mongoose");

const pass = config.db.password.length ?
    `:${config.db.password}` : '';
const auth = config.db.user.length ?
    `${config.db.user}${pass}@` : "";

// mongodb://test:test@localhost:27017/cache_db
mongoose.connect(`mongodb://${auth}${config.db.host}:${config.db.port}/${config.db.name}`,
    () => {
        console.log("DB IS STARTED!");
    });