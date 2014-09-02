// multiple parallel async operations that don't depend on each other

var userService = require("user-service")
var promoService = require("promo-service")
var searchService = require("search-service")

module.exports = function (req, res) {

  userService.getUser() // Returns a promise

  promoService.getPromos(req.body.keyword) // Returns a promise

  searchService.getSearches(req.body.keyword) // Returns a promise

  res.json({profile: {}, promos: [], results: []})
}
