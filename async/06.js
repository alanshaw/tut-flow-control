// multiple parallel async operations that don't depend on each other

var userService = require("user-service")
var promoService = require("promo-service")
var searchService = require("search-service")

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

  var data = {}
  var errd = false
  var taskCount = Object.keys(tasks).length

  Object.keys(tasks).forEach(function (taskName) {
    var task = tasks[taskName]

    task(function (er, taskResult) {
      if (er && !errd) {
        return respond(er)
      }

      data[taskName] = taskResult

      taskCount--
      if (taskCount == 0) respond(null, data)
    })
  })

  function respond (er, data) {
    if (er) return res.status(500).json({message: "Failed to get user/promos/searches"})
    res.json(data)
  }
}
