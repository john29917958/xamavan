const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  res.render("pages/index", { title: "Home" });
});
