// multiple parallel async operations that don't depend on each other

var userService = require("user-service")
var promoService = require("promo-service")
var searchService = require("search-service")

module.exports = function (req, res) {
  var data = {}
  var taskCount = 3

  userService.getUser(function (er, user) {
    if (er) return res.status(500).json({message: "Failed to get user"})
    data.profile = user.profile
    taskCount--
    if (taskCount == 0) res.json(data)
  })

  promoService.getPromos(req.body.keyword, function (er, promos) {
    if (er) return res.status(500).json({message: "Failed to get promos"})
    data.promos = promos
    taskCount--
    if (taskCount == 0) res.json(data)
  })

  searchService.getSearches(req.body.keyword, function (er, results) {
    if (er) return res.status(500).json({message: "Failed to get search results"})
    data.results = results
    taskCount--
    if (taskCount == 0) res.json(data)
  })
}
