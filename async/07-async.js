module.exports = function (tasks, cb) {
  var data = {}
  var errd = false
  var taskCount = Object.keys(tasks).length

  Object.keys(tasks).forEach(function (taskName) {
    var task = tasks[taskName]

    task(function (er, taskResult) {
      if (er && !errd) {
        return cb(er)
      }

      data[taskName] = taskResult

      taskCount--
      if (taskCount == 0) cb(null, data)
    })
  })
}
