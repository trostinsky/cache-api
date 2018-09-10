const Cache = require("../models/cache");
const randomString = require("../utils/random-string");
const CACHE_SIZE = 100;

module.exports = {
    send(req, res, next){
        const {item} = req;
        res.json({
            data: item
        });
    },

    async checkSize(req, res, next){
        const allKeys = await Cache.find();
        const count = allKeys.length;
        if(count > CACHE_SIZE) {
            await Cache.remove({ _id: allKeys[0]._id});
        }
        next();
    },

    async create(req, res, next){
        try {
            const {key, _id, ...fields} = req.body;
            req.item = await Cache.create({
                key: req.params.key,
                ...fields
            });
            next();
        } catch(err) {
            next(err);
        }
    },

    async update(req, res, next){
        try {
            const {key, _id, __v, ...fields} = req.body;
            req.item = await Cache.findOneAndUpdate({
                key: req.params.key
            }, {
                ...fields
            }, {
                new: true
            });
            next();
        } catch(err) {
            next(err);
        }
    },

    async getOne(req, res, next){
        try {
            req.item = await Cache.findOne({
                key: req.params.key
            });
            next();
        } catch(err){
            next(err);
        }
    },
    async generateRandomCache(req, res, next){
        try {
            if (req.item) next();
            req.item = await Cache.create({
                key: req.params.key,
                value: randomString()
            });
            next();
        } catch(err){
            next(err);
        }
    },

    async getAll(req, res, next){
        try {
            req.item = await Cache.find();
            next();
        } catch(err){
            next(err);
        }
    },

    async deleteAll(req, res, next){
        try {
            req.item = await Cache.find();
            await Cache.remove();
            next();
        } catch(err){
            next(err);
        }
    },

    async deleteOne(req, res, next){
        try{
            req.item = await Cache.findOneAndRemove({
                key: req.params.key
            });
            next();
        } catch(err){
            next(err);
        }
    },

    async deleteOldItems(){
        try {
            await Cache.remove({
                TTL: {
                    $lte: new Date()
                }
            });
            const acutalItems = await Cache.find();
        } catch(err){
            console.error(err.message);
        }
    },
    async renderStats(req, res, next){
        const count = await Cache.count();
        res.render("example", {
            title: "Сейчас в базе: ",
            count
        });
    }
}