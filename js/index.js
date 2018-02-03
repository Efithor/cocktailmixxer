var TOP_GLASS_Y;
var BOTTOM_GLASS_Y;
var LEFT_GLASS_X;
var RIGHT_GLASS_X;
var TOP_GAP = 30;
var GLASS_WIDTH = 3;
var c;
var ctx;
var ingredColors = {};
var TOP_PART;
var CANVAS_WIDTH = 550;
var CANVAS_HEIGHT = 550;
var GLASS = "collins";

//this function is called when the DOM is ready apparently is equivalent to $(document).reday(function(){});
$(function() {
	c = $("#drink")[0];
	ctx = c.getContext("2d");
	ctx.font = '14px sans-serif';
	colorizeIngredients();
    consoleDrink();
    genDrinkList();
});

window.onload = function(){
	drinkCanvas = document.getElementById('drink');
	paper.setup(drinkCanvas);
}

function colorizeIngredients() {
	ingredColors["creme de menthe"] = '#058605';
	ingredColors["creme de cacao"] = '#693D23';
	ingredColors["fresh cream"] = '#E9E6E1';
	ingredColors["vodka"] = '#D6D8DD';
	ingredColors["lime juice"] = '#82C731';
	ingredColors["ginger beer"] = '#FEA521';
	ingredColors["tequila"] = '#FDE8B1';
	ingredColors["cointreau"] = '#A6A8AD';
	ingredColors["white rum"] = '#D7D6DE';
	ingredColors["mint"] = '#7AB120';
	ingredColors["sugar"] = '#E5E5E3';
	ingredColors["soda water"] = '#E3E4E6';
	ingredColors["triple sec"] = '#320906';
	ingredColors["gin"] = '#E0E0E0';
	ingredColors["lemon juice"] = '#FEF823';
	ingredColors["simple syrup"] = '#CCCCCC';
	ingredColors["coca-cola"] = '#66130B';
	ingredColors["sweet red vermouth"] = '#BE697F';
	ingredColors["campari"] = '#840000';
	ingredColors["grenadine"] = '#E80000';
	ingredColors["orange juice"] = '#FFB500';
	ingredColors["cherry"] = '#A60707';
	ingredColors["ice"] = '#71C4D9';
  ingredColors["peach schnapps"] = '#E5E5E3';
  ingredColors["cranberry juice"] = '#D8161F';
  ingredColors["bourbon"] = '#B15900';
  ingredColors["cognac"] = '#F8931B';
  ingredColors["rum"] = '#1B0000';
	ingredColors["rye whiskey"] = '#000000';
}

function drawGlass(nameOfGlass) {
	switch (nameOfGlass) {
		case "collins":
			GLASS = "collins";
			drawCollinsGlass();
			break;
		case "old fashioned":
			GLASS = "old fashioned";
			drawOldFashionedGlass();
			break;
		case "cocktail":
			GLASS = "cocktail";
			drawCocktailGlass();
			break;
		case "highball":
			GLASS = "highball";
			drawCollinsGlass();
			break;
		case "copper mug":
			GLASS = "copper mug";
			drawOldFashionedGlass();
			break;
		case "margarita":
			GLASS = "margarita";
			drawCocktailGlass();
            break;
		default:
			GLASS = "collins";
			drawCollinsGlass();
	}
}

//draws a Collins Glass. 3 lines
function drawCollinsGlass() {
	TOP_GLASS_Y = 30;
	BOTTOM_GLASS_Y = 490;
	LEFT_GLASS_X = 60.5;
	RIGHT_GLASS_X = 300.5;
	var collinsGlass = new paper.Path();
	collinsGlass.strokeColor = 'black';
	collinsGlass.strokeWidth = GLASS_WIDTH;
	collinsGlass.add(new paper.Point(LEFT_GLASS_X, TOP_GLASS_Y));
	collinsGlass.add(new paper.Point(LEFT_GLASS_X, BOTTOM_GLASS_Y));
	collinsGlass.add(new paper.Point(RIGHT_GLASS_X, BOTTOM_GLASS_Y));
	collinsGlass.add(new paper.Point(RIGHT_GLASS_X, TOP_GLASS_Y));
}

function drawOldFashionedGlass() {
	TOP_GLASS_Y = 260;
	BOTTOM_GLASS_Y = 490;
	LEFT_GLASS_X = 60.5;
	RIGHT_GLASS_X = 300.5;
	var oldFashionedGlass = new paper.Path();
	oldFashionedGlass.strokeColor = 'black';
	oldFashionedGlass.strokeWidth = GLASS_WIDTH;
	oldFashionedGlass.add(new paper.Point(LEFT_GLASS_X, TOP_GLASS_Y));
	oldFashionedGlass.add(new paper.Point(LEFT_GLASS_X, BOTTOM_GLASS_Y));
	oldFashionedGlass.add(new paper.Point(RIGHT_GLASS_X, BOTTOM_GLASS_Y));
	oldFashionedGlass.add(new paper.Point(RIGHT_GLASS_X, TOP_GLASS_Y));

}

function drawCocktailGlass() {
	ctx.lineWidth = GLASS_WIDTH;
	TOP_GLASS_Y = 30;
	LEFT_GLASS_X = 60.5;
	RIGHT_GLASS_X = 320.5;
	BOTTOM_GLASS_Y = 213;
	var cocktailGlass1 = new paper.Path;
	var cocktailGlass2 = new paper.Path;
	var cocktailGlass3 = new paper.Path;
	cocktailGlass1.strokeColor = 'black';
	cocktailGlass1.strokeWidth = GLASS_WIDTH;
	cocktailGlass1.add(new paper.Point(LEFT_GLASS_X,TOP_GLASS_Y));
	cocktailGlass1.add(new paper.Point((RIGHT_GLASS_X - LEFT_GLASS_X)/2 + LEFT_GLASS_X,BOTTOM_GLASS_Y));
	cocktailGlass1.add(new paper.Point(RIGHT_GLASS_X, TOP_GLASS_Y));
	cocktailGlass2.strokeColor = 'black';
	cocktailGlass2.strokeWidth = GLASS_WIDTH;
	cocktailGlass2.add(new paper.Point((RIGHT_GLASS_X-LEFT_GLASS_X)/2 + LEFT_GLASS_X,BOTTOM_GLASS_Y));
	cocktailGlass2.add(new paper.Point((RIGHT_GLASS_X-LEFT_GLASS_X)/2 + LEFT_GLASS_X, BOTTOM_GLASS_Y + 250));
	cocktailGlass3.strokeColor = 'black';
	cocktailGlass3.strokeWidth = GLASS_WIDTH;
	cocktailGlass3.add(new paper.Point((RIGHT_GLASS_X-LEFT_GLASS_X)/3 + LEFT_GLASS_X,BOTTOM_GLASS_Y + 250));
	cocktailGlass3.add(new paper.Point(2*(RIGHT_GLASS_X-LEFT_GLASS_X)/3 + LEFT_GLASS_X,BOTTOM_GLASS_Y + 250));
}

//takes in array with "parts" (n-numbers) Fills the glass with rectangles, size according to parts.
//not to the brim, leave gap
//3 arrays given
function drawParts(partsArr, colorArr, textArr) {
	var height = BOTTOM_GLASS_Y - TOP_GLASS_Y - TOP_GAP;	//height of glass for the parts
	var numParts = 0;		//total of how many parts there are
	for (var i = 0; i < partsArr.length; i++) {	//add up number of parts, store in numParts
		numParts = numParts + partsArr[i];
	}
	var eachPartSize = height/numParts;	//size of each part
	var thisPartSize;	//size of this  part in the drink
	var runningPartTotal = 0;
	var adjustedBottom = BOTTOM_GLASS_Y - 0.5*GLASS_WIDTH;
	var textLocation_X = RIGHT_GLASS_X + 20;
	var x;
	var y;
	var partWidth = RIGHT_GLASS_X - LEFT_GLASS_X - GLASS_WIDTH;		//width of each part is distance between the glass sides minus the width
	for (var i = 0; i < partsArr.length; i++) {		//for each of the part
		thisPartSize = partsArr[i] * eachPartSize;		//this part size is size of the part * the size
		runningPartTotal = runningPartTotal + partsArr[i]/2;	//update runningPartTotal for text alignment halfway up
		var ingText = new paper.PointText(new paper.Point(textLocation_X,adjustedBottom - runningPartTotal*eachPartSize));
		ingText.fillColor = 'black';
		//print name of part at shifted x and halfway up the new part
		ingText.content = textArr[i];
		var boozeLayer;
		runningPartTotal = runningPartTotal + partsArr[i]/2;	//finish updating runningPartTotal for part alignment
		//X: left side plus 1/2 of the width for no overlap, Y: Bottom, then up by number of part, then up by glass width for no overlap
		if (GLASS == "collins" || GLASS == "old fashioned" || GLASS == "highball" || GLASS == "copper mug") {
			//Define boozelayer dimentions if rectangle.
			boozeLayer = new paper.Path.Rectangle(new paper.Point(LEFT_GLASS_X+2,(adjustedBottom - (runningPartTotal)*eachPartSize)+thisPartSize), new paper.Point(RIGHT_GLASS_X-2, adjustedBottom - (runningPartTotal)*eachPartSize));
			boozeLayer.fillColor = ingredColors[colorArr[i]];
		} else {
			y = adjustedBottom - (runningPartTotal * eachPartSize);
			x = 1.95*GLASS_WIDTH + (y+(13434/260))*(130/183);
			boozeLayer = new paper.Path();
			boozeLayer.add(new paper.Point(x,y));
			boozeLayer.add(new paper.Point(-(1.5)*GLASS_WIDTH+(y - (125103/260))*(-130/183),y));
			if (i == 0) {
				boozeLayer.add(new paper.Point((RIGHT_GLASS_X-LEFT_GLASS_X)/2 + LEFT_GLASS_X, y + thisPartSize));
				boozeLayer.fillColor = ingredColors[colorArr[i]];
			} else {
				var oldY = adjustedBottom-(runningPartTotal*eachPartSize)+thisPartSize;
				boozeLayer.add(new paper.Point(-(1.5)*GLASS_WIDTH+(oldY-(125103/260))*(-130/183),oldY));
				boozeLayer.add(new paper.Point(1.5*GLASS_WIDTH+(oldY+(13434/260))*(130/183),oldY));
				boozeLayer.fillColor = ingredColors[colorArr[i]];
			}
		}
	}
}

function addIce() {
	if(GLASS == "collins" || GLASS == "highball" || GLASS == "old fashioned" || GLASS == "copper mug") {
		var iceCube1 = new paper.Path.Rectangle(new paper.Point(LEFT_GLASS_X + 20,BOTTOM_GLASS_Y - iceSize - 17),new paper.Point(LEFT_GLASS_X+iceSize+20,BOTTOM_GLASS_Y-17));
		iceCube1.fillColor = ingredColors["ice"];
		iceCube1.fillColor.alpha = 0.5;
		iceCube1.rotate(25);
		var iceCube2 = new paper.Path.Rectangle(new paper.Point(RIGHT_GLASS_X-5,BOTTOM_GLASS_Y - iceSize-2),new paper.Point(RIGHT_GLASS_X-iceSize-5,BOTTOM_GLASS_Y-2));
		iceCube2.fillColor = ingredColors["ice"];
		iceCube2.fillColor.alpha = 0.5;
	}
	if (GLASS == "collins" || GLASS == "highball") {
		var iceCube3 = new paper.Path.Rectangle(new paper.Point(LEFT_GLASS_X + 20,BOTTOM_GLASS_Y - 2*iceSize - 77),new paper.Point(LEFT_GLASS_X+iceSize+20,BOTTOM_GLASS_Y-iceSize-77));
		iceCube3.fillColor = ingredColors["ice"];
		iceCube3.fillColor.alpha = 0.5;
		iceCube3.rotate(25);
		var iceCube4 = new paper.Path.Rectangle(new paper.Point(RIGHT_GLASS_X-20,BOTTOM_GLASS_Y - 2*iceSize-18),new paper.Point(RIGHT_GLASS_X-iceSize-20,BOTTOM_GLASS_Y-iceSize-18));
		iceCube4.fillColor = ingredColors["ice"];
		iceCube4.fillColor.alpha = 0.5;
		iceCube4.rotate(-25);
	}
	if (GLASS == "margarita" || GLASS == "cocktail") {
		var iceCube1 = new paper.Path.Rectangle(new paper.Point(LEFT_GLASS_X + 20,BOTTOM_GLASS_Y - iceSize - 17),new paper.Point(LEFT_GLASS_X+iceSize+20,BOTTOM_GLASS_Y-17));
		iceCube1.fillColor = ingredColors["ice"];
		iceCube1.fillColor.alpha = 0.5;
		iceCube1.rotate(25);
	}
}

function moveAndRotate(moveX, moveY, rotateAngle) {
	ctx.translate(moveX, moveY);
	ctx.rotate(rotateAngle);
	ctx.translate(-moveX, -moveY);
}

function addStraw() {
	var straw1 = new paper.Path(new paper.Point(RIGHT_GLASS_X - 5,TOP_GLASS_Y - 25), new paper.Point(RIGHT_GLASS_X - 35,TOP_GLASS_Y + 25));
	straw1.rotate(25);
	straw1.fillColor = 'blue';
	straw1.sendToBack();
	//ctx.fillRect(RIGHT_GLASS_X - 30, TOP_GLASS_Y - 25, 20, 25+TOP_GAP);
	//ctx.fillRect(RIGHT_GLASS_X - 30, TOP_GLASS_Y - 25, 60, 20);
}

function reset() {
	//Remove everything in the vector object array.
}

function addLemon(lemIs0_limeIs1_orangeIs2) {
	var fruit = new paper.Path();
	if (lemIs0_limeIs1_orangeIs2 == 0) {
		ctx.fillStyle = ingredColors['lemon juice'];
	} else if (lemIs0_limeIs1_orangeIs2 == 1) {
		ctx.fillStyle = ingredColors['lime juice'];
	} else {
		ctx.fillStyle = ingredColors['orange juice'];
	}
	ctx.beginPath();
	ctx.moveTo(LEFT_GLASS_X, TOP_GLASS_Y + 25);
	ctx.arc(LEFT_GLASS_X, TOP_GLASS_Y + 25, 50,  (Math.PI/180)*160, (Math.PI/180)*-20, 0);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = 'black';
	ctx.beginPath();
	if(GLASS == "collins" || GLASS == "highball" || GLASS == "old fashioned" || GLASS == "copper mug") {
		ctx.moveTo(LEFT_GLASS_X, TOP_GLASS_Y + 35);
	}
	else {
		ctx.moveTo(GLASS_WIDTH + (TOP_GLASS_Y+35+(13434/260))*(130/183), TOP_GLASS_Y+35);
	}
	ctx.lineWidth = GLASS_WIDTH;
	ctx.lineTo(LEFT_GLASS_X, TOP_GLASS_Y);
	ctx.stroke();
	ctx.lineWidth = 1;
}

function addCherry() {
	ctx.fillStyle = ingredColors['cherry'];
	ctx.beginPath();
	ctx.moveTo(2*(RIGHT_GLASS_X - LEFT_GLASS_X) / 3 + 20, TOP_GLASS_Y + TOP_GAP);
	ctx.arc(2*(RIGHT_GLASS_X - LEFT_GLASS_X) / 3, TOP_GLASS_Y + TOP_GAP, 20, 0, Math.PI, 1);
	ctx.fill();
	ctx.fillStyle = 'black';
}
