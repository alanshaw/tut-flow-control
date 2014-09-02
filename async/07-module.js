var userService = require("user-service")
var promoService = require("promo-service")
var searchService = require("search-service")
var async = require("./07-async")

module.exports = function (req, res) {
  var tasks = {
    profile: function (cb) {
      userService.getUser(function (er, user) {
        if (er) return cb(er)
        cb(null, user.profile)
      })
    },
    promos: function (cb) {
      promoService.getPromos(req.body.keyword, function (er, promos) {
        if (er) return cb(er)
        cb(null, promos)
      })
    },
    results: function (cb) {
      searchService.getSearches(req.body.keyword, function (er, results) {
        if (er) return cb(er)
        cb(null, results)
      })
    }
  }

  async(tasks, function respond (er, data) {
    if (er) return res.status(500).json({message: "Failed to get user/promos/searches"})
    res.json(data)
  })
}
