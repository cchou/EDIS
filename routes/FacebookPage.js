// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });
// module.exports = router;


var https = require('https'),
    concat = require('concat-stream'),
    async = require('async');

function FacebookPage(pageId) {
    debugger
    if (!(this instanceof FacebookPage))
        return new FacebookPage(pageId);

    this.pageId = pageId;
}

FacebookPage.prototype.getPublicFeeds = function (callback) {

var pageId = 'carol.chou.923';

async.waterfall([

  function (done) {
    debugger
        var params = {
            hostname: 'graph.facebook.com',
            port: 443,
            path: '/oauth/access_token?client_id=MY_CLIENT_ID&' +
                'client_secret=MY_CLIENT_SECRET&grant_type=client_credentials',
            method: 'GET'
        };

        https.get(params, function (response) {
            //response is a stream so it is an EventEmitter
            response.setEncoding("utf8");

            //More compact
            response.pipe(concat(function (data) {
                done(null, data);
            }));

            response.on("error", done);
        });
  },

  function (access_token, done) {

        var params = {
            hostname: 'graph.facebook.com',
            port: 443,
            path: '/v2.0/' + pageId + '/feed?' + access_token,
            method: 'GET'
        };

        https.get(params, function (response) {
            //response is a stream so it is an EventEmitter
            response.setEncoding("utf8");

            //More compact
            response.pipe(concat(function (data) {
                callback(null, JSON.parse(data));
            }));

            response.on("error", callback);
        });

  }]);
};

module.exports = FacebookPage;