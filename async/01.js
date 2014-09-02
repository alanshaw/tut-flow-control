// multiple parallel async operations that don't depend on each other

var userService = require("user-service")
var promoService = require("promo-service")
var searchService = require("search-service")

module.exports = function (req, res) {

  userService.getUser(function (er, user) {
    // 300ms
  })

  promoService.getPromos(req.body.keyword, function (er, promos) {
    // 500ms
  })

  searchService.getSearches(req.body.keyword, function (er, results) {
    // 1000ms
  })

  res.json({profile: {}, promos: [], results: []})
}
