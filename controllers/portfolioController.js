const asyncHandler = require("express-async-handler");

exports.businessWebDesignSample = asyncHandler(async (req, res) => {
  res.render("pages/business-web-design-sample", { title: "Business Website" });
});
