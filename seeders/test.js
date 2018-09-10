const connect = require("../utils/connect");
const Cache = require("../models/cache");
const randomString = require("../utils/random-string");
const testKeys = [];
for(let i = 1; i <= 100; i++){
    testKeys.push({
        key: `${randomString()}${i}`,
        value: `${randomString()}${i}`
    })
}
const seedFunction = async () => {
    return await Cache.insertMany(testKeys)
};
if(!module.parent){
    seedFunction();
}
module.exports = seedFunction;
