const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  res.render("pages/portfolio/index", { title: "Portfolio" });
});

exports.businessWebDesignSample = asyncHandler(async (req, res) => {
  res.render("pages/portfolio/business-web-design-sample", {
    title: "Business Website",
    layout: false
  });
});
