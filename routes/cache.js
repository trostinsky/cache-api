const express = require("express");
const router = express.Router();
const cacheController = require("../controllers/cache");

router.get("/", cacheController.getAll, cacheController.send); // find in DB, return
router.get("/:key"); // find by Key, return
router.post("/:key"); // create by key, return
router.put("/:key"); // update by key, return
router.delete("/"); // delete all, return
router.delete("/:key"); // delete by key, return

module.exports = router;