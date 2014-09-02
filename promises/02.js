// multiple parallel async operations that don't depend on each other

var userService = require("user-service")
var promoService = require("promo-service")
var searchService = require("search-service")
var Q = require("q")

module.exports = function (req, res) {
  // * An IOU
  // * A promise is a value, returned immediately
  // * Later fulfilled or rejected - once
  // * Can use before or after value arrives
  // * Chain promises together

  // .then() with a function that accepts the value when it arrives
  // .then() returns a new promise - for the return value of the function

  Q.all([
    userService.getUser(),
    promoService.getPromos(req.body.keyword),
    searchService.getSearches(req.body.keyword)
  ]).then(function (data) {
    res.json({profile: data[0], promos: data[1], results: data[2]})
  }).fail(function (er) {
    res.status(500).json({message: "Failed to get profile/promos/results"})
  })

  // Or maybe:
  /*
  Q.spread([
    userService.getUser(),
    promoService.getPromos(req.body.keyword),
    searchService.getSearches(req.body.keyword)
  ], function (profile, promos, results) {
    res.json({profile: profile, promos: promos, results: results})
  }).fail(function (er) {
    res.status(500).json({message: "Failed to get profile/promos/results"})
  })
  */
}
