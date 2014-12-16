/**
 *
 *		http proxy
 *
 *		@param config
 *			host:"remote ip address"
 *			port:"remote port"
 *			logger:logger
 *
 *
 */
var http = require('http');


module.exports = function(config) {
    return function(request, response, next) {
        var headers = {};
		if(!config.logger){
			 console.log("http_proxy:" + config.host + request.url);
		}
        for (var x in request.headers) {
            headers[x] = request.headers[x];
        }

        headers['Content-Type'] = 'application/x-www-form-urlencoded';

        var proxy_request = http.request({
            host: config.host,
            port: config.port,
            method: request.method,
            path: request.url,
            headers: headers
        });
        proxy_request.on('response', function(proxy_response) {
            response.writeHead(proxy_response.statusCode, proxy_response.headers);
            proxy_response.on('data', function(chunk) {
                response.write(new Buffer(chunk));
            });
            proxy_response.on('end', function() {
                response.end();
            });

        });

        request.on('data', function(chunk) {
            proxy_request.write(new Buffer(chunk));
        });

        request.on('end', function() {
            proxy_request.end();
        });
    };
};
