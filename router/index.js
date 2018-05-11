let express = require("express");
let router = express.Router();

router.use("/books", require(__dirname+"/bookRouter"));

module.exports = router;
