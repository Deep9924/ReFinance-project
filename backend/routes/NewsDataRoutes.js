const express = require("express");
const router = express.Router();
const getHomeNewsData = require("../controller/News/GetHomeNewsController");
const addHomeNewsData = require("../controller/News/AddHomeNewsController");
const removeHomeNewsData = require("../controller/News/RemoveHomeNewsController");

router.get("/", getHomeNewsData);
router.post("/addhomenews", addHomeNewsData);
router.post("/removehomenews", removeHomeNewsData);

module.exports = router;
