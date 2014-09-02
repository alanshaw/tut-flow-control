var userService = require("user-service")

userService.setUser({profile: {name: "Alan"}})
  .then(function () {
    return userService.getUser()
  })
  .then(function (user) {
    console.log(user.profile.name)
  })
  .done()
