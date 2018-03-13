var mongoose = require('mongoose');
var functions = require('./functions.js');
var osmosis = require('osmosis');
var nbateams = {
    GSW: "golden-state-warriors",
    Houston: "houston-rockets",
    Toronto: "toronto-raptors",
    Boston: "boston-celtics",
    OKC: "oklahoma-city-thunder",
    SAS: "san-antonio-spurs",
    Minnesota: "minnesota-timberwolves",
    Utah: "utah-jazz",
    Washington: "washington-wizards",
    Philadelphia: "philadelphia-76ers",
    LAC: "los-angeles-clippers",
    Cleveland: "cleveland-cavaliers",
    Denver: "denver-nuggets",
    Portland: "portland-trail-blazers",
    NOP: "new-orleans-pelicans",
    Milwaukee: "milwaukee-bucks",
    Indiana: "indiana-pacers",
    Charlotte: "charlotte-hornets",
    Miami: "miami-heat",
    Detroit: "detroit-pistons",
    Dallas: "dallas-mavericks",
    LAL: "los-angeles-lakers",
    NY: "new-york-knicks",
    Memphis: "memphis-grizzlies",
    Orlando: "orlando-magic",
    Brooklyn: "brooklyn-nets",
    ATL: "atlanta-hawks",
    Chicago: "chicago-bulls",
    Sacramento: "sacramento-kings",
    Phoenix: "phoenix-suns",
  };


module.exports = (function() {
	return{

        pull : function(req,res){
          var array = [];
         
          for (teams in nbateams){
            
            //console.log(teams);


                functions.pullstats(function(callback){
                  
                  array.push(callback);
               
                }, nbateams[teams]);
          }

          
          var timeout = setInterval(function(){ 
            if(array.length == 30) { 
              clearInterval(timeout);
              res.json(array) 
            } 
          }, 100);

          //######## FOR TESTING ONE TEAM
          // var team = nbateams.NY;
          // functions.pullstats(function(callback){
          //       array.push(callback);
          //       res.json(array);
          //       }, team);
          
        
          
        },




        
        pullteam: function(req,res){
          var array = [];
          var team = nbateams.Sacramento;
          functions.pullteam(function(callback){
            
            array = callback;
            res.json(array)
          }, team);


        },




    }
})();