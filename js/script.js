
var data_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var values_array = [];
var tileids = [];
var flipped_tiles = 0;
var imgtag='<img src="img/question.jpg" alt="???" height="100px" width="100px">'

Array.prototype.shuffle = function(){
    var x = this.length, y, ext;
    while(--x > 0){
        y = Math.floor(Math.random() * (x+1));
        ext = this[y];
        this[y] = this[x];
        this[x] = ext;
    }
}

function canvasNew(){
	document.getElementById('canvas').innerHTML = "";
	flipped_tiles = 0;
	var output = '';
    data_array.shuffle();
	for(var i = 0; i < data_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="flipfun(this,\''+data_array[i]+'\')">'+imgtag+'</div>';
	}
	document.getElementById('canvas').innerHTML = output;
	document.getElementById('score').innerHTML = '0';
}

function flipfun(cell,data){
	if(cell.innerHTML == imgtag && values_array.length < 2){
		cell.innerHTML = data;
		if(values_array.length == 0){
			values_array.push(data);
			tileids.push(cell.id);
		} else if(values_array.length == 1){
			values_array.push(data);
			tileids.push(cell.id);
			if(values_array[0] == values_array[1]){
				flipped_tiles += 2;
				document.getElementById('score').innerHTML = flipped_tiles;
				// Clear both arrays
				values_array = [];
            	tileids = [];
				// Check to see if the whole board is cleared
				if(flipped_tiles == data_array.length){
					alert("Wohooo!!!! Completed the Board. Generating new Board");
					canvasNew();
				}
			} else {
				function cardflip(){
				    // Flip the 2 tiles back over
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

window.onload=canvasNew;