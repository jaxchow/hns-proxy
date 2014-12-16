hns-proxy
=========

express proxy middleware

==========
var proxy=require("hns-proxy");
hns.use(proxy(
	host:"192.168.0.1",
	port:"8080",
	logger:true
));
