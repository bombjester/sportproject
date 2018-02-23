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
            
           
            osmosis.get("https://www.teamrankings.com/nba/team/" + nbateams.NY)
            // .find("table.team-blockup")
            // .set("ranking")
            .find("table.datatable/tbody/tr")
            .set("table")
            .data(function(results){
              var array2 = [];
              var longword = "";
               // console.log(results);
                someText = results.table.replace(/\n/g,'|');
                //console.log(someText.length);
                 string = "";

                 for (x in someText){
                    var parseint = Number.parseInt(x);
                   
                   if (someText[x] != "|"){
                     
                     string += someText[x];
                     if(x == someText.length-1){
                      array2.push(string.trim());
                      }
                   }
                   else{
                    
                  
                   longword = string.trim();
                      if(longword != ""){
                       // console.log(longword + " IS THE LONGWORD");
                        array2.push(longword);
                      }
                    string = "";
                   }
                  
                 }

                 
                  if(array2.length == 9){
                    var input ={"Date": array2[0], 
                                "Opponent": array2[1],
                                "Result": array2[2],
                                "Location": array2[3],
                                "WL": array2[4],
                                "Div": array2[5],
                                "Spread": array2[6],
                                "Total": array2[7],
                                "Money": array2[8]};
                    array.push(input);
                  }
                  else{

                    input ={"Date": array2[0], 
                                "Opponent": array2[1],
                                "Result": array2[2],
                                "Location": array2[3],
                                "WL": "--",
                                "Div": "--",
                                "Spread": "--",
                                "Total": "--",
                                "Money": "--"};
                    
                    array.push(input);
                  }

                 
                //console.log(array2.length);
               
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