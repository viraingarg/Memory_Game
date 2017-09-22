//global variables used 

//array containing the cards
var data_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];

//variables used in game logic
var values_array = [];
var tileids = [];

//variable used to store total no flipped tiles
var flipped_tiles = 0;

//variables containing image tag 
var imgtag='<img src="img/question.jpg" alt="???" height="100px" width="100px">';
var imgstar='<img src="img/star.ico" height="25px" width="25px">';

//variables used to display time
var time;
var totalSeconds;
var seconds;
var minutes;
var valString;

//variable used to store no of moves
var moves;

//variable used to store star rating
var star;

//function to shuffle array data so that every time cards will be place randomly
Array.prototype.shuffle = function(){
    var x = this.length, y, ext;
    while(--x > 0){
        y = Math.floor(Math.random() * (x+1));
        ext = this[y];
        this[y] = this[x];
        this[x] = ext;
    }
};


//function used to create game canvas and tiles to be flipped
function canvasNew(){
	document.getElementById('canvas').innerHTML = "";
	flipped_tiles = 0;
	moves=0;
	var output = '';
	//shuffling array
    data_array.shuffle();
	
	//for loop to create tiles and append them into the canvas
	for(var i = 0; i < data_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="flipfun(this,\''+data_array[i]+'\')">'+imgtag+'</div>';
	}
	document.getElementById('canvas').innerHTML = output;
	document.getElementById('score').innerHTML = '0';
}

//function is called whenever a tile is flipped to do the various functioning
function flipfun(cell,data){
	//logic to check whether the tile is already flipped or not
	if(cell.innerHTML == imgtag && values_array.length < 2){
		
		//putting data onto the other side of tile on flpping
		cell.innerHTML = data;
		
		//incrementing move value by 1
		++moves;
		
		//displaying moves in the information board of html
		document.getElementById('moves').innerHTML = moves;
		
		//check whether it is the first card or the second card to be paired
		if(values_array.length == 0){
			values_array.push(data);
			tileids.push(cell.id);
		} 
		//if the card is the second card which is to be paired
		else if(values_array.length == 1){
			values_array.push(data);
			tileids.push(cell.id);
			
			//checks if both the card are same or not
			if(values_array[0] == values_array[1]){
				flipped_tiles += 2;
				document.getElementById('score').innerHTML = flipped_tiles;
				// Clear both arrays
				values_array = [];
            	tileids = [];
				
				// Check to see if the whole board is cleared
				if(flipped_tiles == data_array.length){
					
					//message to display on completing the game
					var r = confirm("Cogratulations, You have completed the game in " +minutes+" min "+ seconds+" sec and "+
					        "you have been given "+star+" stars. Do you want to play it again ?");
					if (r == true) {
						
						 //reoading window to restart the game
						 window.location.reload();
					}
				}
				//if both the cards are different
			} else {
				
				//unflip the cards again
				function cardflip(){
				    var tile_1 = document.getElementById(tileids[0]);
				    var tile_2 = document.getElementById(tileids[1]);
            	    tile_1.innerHTML = imgtag;
            	    tile_2.innerHTML = imgtag;
				    // Clear both arrays
				    values_array = [];
            	    tileids = [];
				}
				setTimeout(cardflip, 300);
			}
		}
	}
}

//A utility function to display timer and star rating
function utility(){
	
        time = document.getElementById("timer");
		time.innerHTML="0";
		seconds=0;
		minutes=0;
        totalSeconds = 0;
        setInterval(setTimeandRating, 1000);
		
		//sets time and rating and checks again after every 1 sec
        function setTimeandRating()
        {
			//logic to check star rating 
			if(moves < 31){
				star = 3;
			}
			else if(moves > 30 && moves < 51){
				star = 2;
			}
			else{
				star = 1;
			}
			el = document.getElementById("stars");
			el.innerHTML="";
			
			//for loop to add stars on the html element
			for (var i = 0; i < this.star; i++){
				var s = document.createElement('span');
				s.innerHTML=imgstar;
				el.appendChild(s);
			}
            ++totalSeconds;
			
			//calculating seconds and minutes
            seconds = pad(totalSeconds%60);
            minutes = pad(parseInt(totalSeconds/60));
			time.innerHTML= minutes+":"+seconds;
        }

        function pad(val)
        {
            valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }
}

// main function which calls all the other required functions
function allfun(){
	canvasNew();
	utility();
}

//to call main function on window load
window.onload= allfun;