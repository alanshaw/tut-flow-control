// multiple parallel async operations that don't depend on each other

var userService = require("user-service")
var promoService = require("promo-service")
var searchService = require("search-service")

module.exports = function (req, res) {
  // Do each task (loop)
  // When ALL tasks complete:
  //    Deal with error and/or respond with json (callback)

  var tasks = [
    function (cb) {
      userService.getUser(function (er, user) {
        if (er) return cb(er)
        cb(null, user.profile)
      })
    },
    function (cb) {
      promoService.getPromos(req.body.keyword, function (er, promos) {
        if (er) return cb(er)
        cb(null, promos)
      })
    },
    function (cb) {
      searchService.getSearches(req.body.keyword, function (er, results) {
        if (er) return cb(er)
        cb(null, results)
      })
    }
  ]

  var data = []
  var errd = false
  var taskCount = tasks.length

  tasks.forEach(function (task) {
    task(function (er, taskResult) {
      if (er && !errd) {
        return respond(er)
      }

      data.push(taskResult)

      taskCount--
      if (taskCount == 0) respond(null, data)
    })
  })

  function respond (er, data) {
    if (er) return res.status(500).json({message: "Failed to get user/promos/searches"})
    var map = { // WHAT IS WRONG HERE?
      profile: data[0],
      promos: data[1],
      results: data[2]
    }
    res.json(map)
  }
}
