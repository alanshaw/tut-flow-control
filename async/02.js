// multiple parallel async operations that don't depend on each other

var userService = require("user-service")
var promoService = require("promo-service")
var searchService = require("search-service")

module.exports = function (req, res) {
  var data = {}
  var taskCount = 3

  userService.getUser(function (er, user) {
    data.profile = user.profile
    taskCount--
    if (taskCount == 0) res.json(data)
  })

  promoService.getPromos(req.body.keyword, function (er, promos) {
    data.promos = promos
    taskCount--
    if (taskCount == 0) res.json(data)
  })

  searchService.getSearches(req.body.keyword, function (er, results) {
    data.results = results
    taskCount--
    if (taskCount == 0) res.json(data)
  })
}
