var doge = require("./../controllers/controller.js");

module.exports = function(app){
	app.get('/pull', function(req,res){
		
		doge.pull(req,res);
	})
	app.get('/pullteam', function(req,res){
		doge.pullteam(req,res);
	})
	
}