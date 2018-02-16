var mongoose = require('mongoose');
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
    Brooklyn:"brooklyn-nets",
    ATL: "atlanta-hawks",
    Chicago: "chicago-bulls",
    Sacramento: "sacramento-kings",
    Phoenix: "phoenix-suns",


  };


module.exports = (function() {
	return{

        pull : function (req,res){
            var array = [];
            var teamrank = {};
            var someText = "";
            var string = "";
            console.log("get here");
            osmosis.get("https://www.teamrankings.com/nba/team/" + nbateams.NY)
            // .find("table.team-blockup")
            // .set("ranking")
            .find("table.datatable/tbody/tr")
            .set("table")
            .data(function(results){
                //console.log(results);
                someText = results.table.replace(/\n/g,'');
                 //console.log(someText);
                 string = "";
                 for (x in someText){
                    var parseint = Number.parseInt(x);
                   
                   if (someText[x] == " " && someText[x+1] == " "){
                     string = "";
                   }
                   else if (x == someText.length-1){
                    string = "";
                   }
                   else{
                    string += someText[x];
                   }
                 }
                // console.log(string);
               array.push(someText);
            })
            .done(function(){
               res.json(array);
            })
        






        },
        pullteam: function(req,res){
            osmosis.get("https://www.teamrankings.com/nba/team/" + nbateams.NY)
        .find("table.team-blockup")
        .set("ranking")
        .data(function(results){
          var string = ""
          someText = results.ranking.replace(/(\r\n|\n|\r|\s)/gm,"");
          someText = someText.replace(",", "");
          
          for (x in someText){
            
            if(someText[x] == ")"){
              
              string += ") ";
            }
            else if(someText[x] == "P"){
              if (someText[x-1] == "e"){
                string+= " P";
              }
              else if (someText[x-2] == "1" || someText[x-2] == "2" || someText[x-2] == "3" || someText[x-2] == "4" || someText[x-2] == "5" || someText[x-2] == "6" || someText[x-2] == "7" || someText[x-2] == "8" || someText[x-2] == "9" ){
                string += " P";
                
              }
              else{
                string += someText[x];
              }
              

            }
            else if(someText[x] == "S"){
              string += " S";
            }
            else{

              string += someText[x];
            }
          }
            var object = {Team: nbateams.NY, Rank: string };
            res.json(object);
            })
            
        },




    }
})();