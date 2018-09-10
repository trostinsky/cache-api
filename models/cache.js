const mongoose = require("mongoose");

const CacheSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    },
    TTL: {
        type: Date,
        default: new Date(Date.now() + 1e5)
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Cache", CacheSchema);