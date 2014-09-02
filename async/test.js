var handler = require("./02")
var start = Date.now()

var req = {
  body: {
    keyword: "foobar"
  }
}

var res = {
  status: function () { return res },
  json: function (json) {
    console.log((Date.now() - start) + "ms")
    console.log(json)
  }
}

handler(req, res)
