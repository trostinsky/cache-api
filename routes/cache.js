const express = require("express");
const schedule = require("node-schedule");
const router = express.Router();
const cacheController = require("../controllers/cache");
const rule = new schedule.RecurrenceRule();

// statistic routes
router.get("/stats", cacheController.renderStats);

// REST routes
router.get("/", cacheController.getAll, cacheController.send); // find in DB, return
router.get("/:key", cacheController.getOne, cacheController.generateRandomCache, cacheController.send); // find by Key, return
router.post("/:key", cacheController.create, cacheController.send); // create by key, return
router.put("/:key", cacheController.update, cacheController.send); // update by key, return
router.delete("/", cacheController.deleteAll, cacheController.send); // delete all, return
router.delete("/:key", cacheController.deleteOne, cacheController.send); // delete by key, return



schedule.scheduleJob("*/20 * * * * *", cacheController.deleteOldItems);

module.exports = router;