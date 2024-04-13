let currentPath = null;

function UrlHelper() {
  this.getUrl = function () {
    return currentPath;
  };

  this.isAtRoot = function () {
    return currentPath === "/";
  };

  this.isAtRoute = function (name) {
    return currentPath.startsWith(name);
  };
}

function currentRoute() {
  return (req, res, next) => {
    currentPath = req.path;
    if (!global.UrlHelper) {
      global.UrlHelper = new UrlHelper();
    }
    const segments = req.path.split("/");
    next();
  };
}

module.exports = currentRoute;
