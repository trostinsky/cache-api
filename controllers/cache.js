const Cache = require("../models/cache");
Cache.create({
    key: "test",
    value: "test-value"
})
module.exports = {
    async send(req, res, next){
        const {item} = req;
        res.json({
            data: item
        });
    },
    async getAll(req, res, next){
        const items = await Cache.find();
        req.item = items;
        next();
    }
}