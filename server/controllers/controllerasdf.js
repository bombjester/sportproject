var mongoose = require('mongoose');
var osmosis = require('osmosis');
var functions = require('./functions.js');
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
			var divarray = [];
      var array = [];
      var object = {};

      // functions.get_rankings(function(result){
        
      //   array = result;
      //   console.log(array);
      // });
      
			osmosis.get("https://www.teamrankings.com/nba/team/" + nbateams.NY)
			.find("table.datatable/tbody/tr")
  		.set("table")
  			.data(function(results){
        console.log(results);
  				var string = "";

  				var someText = results.table.replace(/(\r\n|\n|\r|\s)/gm,"");
          
  				// REGEX COMMANDS
  						var capital = /[A-Z]/g;
  						
  				//console.log(regex.test(someText));
  				for (x in someText){
  					//spearates the Capital letters
  					if (capital.test(someText[x])){
  						//console.log(someText[x]);
  						string += " " + someText[x];
  					}
  					//sepeartes money and +spread
  					else if (someText[x] == "+"){
  						string += " +";
  					}
  					// sepearting money and seperates - spread
  					else if(someText[x] == "-"){
  						var parseint = Number.parseInt(x);
  						var placer = "";
  						//console.log(x, someText.length-1);
  						if ( x == someText.length -2 || x == someText.length-3 || x == someText.length -4|| x == someText.length -5){
  							string +=" ";
  							//console.log("found");
  						}
              if (someText[parseint+2] == "." || someText[parseint+3] == "." ){
              
                string += " -";
              }
            
  						else{
  							string += someText[x];
  						}
  					}
  					

  					//sperates home 
  					else if (someText[x] == "e"){

  						parseint = Number.parseInt(x);
  						if(someText[parseint+1] == "0"|| someText[parseint+1] == "1" || someText[parseint+1] == "2" || someText[parseint+1] == "3" || someText[parseint+1] == "4" || someText[parseint+1] == "5" || someText[parseint+1] == "6" || someText[parseint+1] == "7" || someText[parseint+1] == "8" || someText[parseint+1] == "9"){
  							string += "e ";

  						}
  						else{
  							string += someText[x];
  						}
  					}
  					//sepearates away
  					else if (someText[x] == "y"){

  						parseint = Number.parseInt(x);
  						if(someText[parseint+1] == "0"|| someText[parseint+1] == "1" || someText[parseint+1] == "2" || someText[parseint+1] == "3" || someText[parseint+1] == "4" || someText[parseint+1] == "5" || someText[parseint+1] == "6" || someText[parseint+1] == "7" || someText[parseint+1] == "8" || someText[parseint+1] == "9"){
  							string += "y ";

  						}
  						else{
  							string += someText[x];
  						}
  					}
  					
  					else{
  						string += someText[x];
  					}

  				}

  				//console.log(string);
          array.push(string);
  				
  			})
        .then(function(){
         //console.log(array);
          osmosis.get("https://www.teamrankings.com/nba/team/" + nbateams.NY)
                    .find("table.datatable/tbody/tr/td.basic")
                      .set("div")
                      .data(function(results){
                        
                         //console.log(results.div);
                      if(results.div == "Away" || results.div == "Home"){
                        
                      }
                      else{
                        //console.log(results.div);
                        divarray.push(results.div);
                      }
                    })
              
        })
        .done(function(){
          //console.log(array);
          var template = [];
          var counter = 0;
          var finalarray = [];
          //console.log(array);
          var matcher = "";
          for (var index of array){
            matcher = "";
            for (var letter of index){
              if(letter == " "){
                //console.log(matcher);
                template.push(matcher);
                matcher = "";
              }
              else{
                matcher += letter;

              }
              
            }

           //console.log(template);
            for (x in template){
              counter = 0;
              for (y in template[x]){
                if (template[x][y] == "-"){
                  counter++;
                }
              }
              if(counter < 2){
                finalarray.push(template[x]);
              }
              
            }
          }
          //console.log(finalarray);
          
          
        })
          
       
        
            
         
        
        
	 },

	}
})();