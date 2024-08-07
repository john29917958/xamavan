const express = require("express");
const router = express.Router();

const portfolioController = require("../controllers/portfolioController");

router.get("/", portfolioController.index);

router.get(
  "/business-web-design-sample",
  portfolioController.businessWebDesignSample
);

module.exports = router;
