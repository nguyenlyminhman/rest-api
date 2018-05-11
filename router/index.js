let express = require("express");
let router = express.Router();

router.use("/", require(__dirname+"/bookRouter"));

module.exports = router;
