var linuxWallpaper = require('linux-wallpaper');
var backburner = {};
var path = "./images/WeAreNotTakingTheWizard.jpg"
path = "./wallpaper.png";
var screen = {width:1366, height: 760};

var Canvas = require('canvas')
  , Image = Canvas.Image
    , canvas = new Canvas(screen.width,screen.height)
	  , ctx = canvas.getContext('2d');
	   
	  ctx.font = '30px Impact';
	  //ctx.rotate(.1);
	  ctx.fillText("Awesome!", screen.width/2, screen.height/2);
	   
	  var te = ctx.measureText('Backburner!');
	  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
	  ctx.beginPath();
	  ctx.lineTo(50, 102);
	  ctx.lineTo(50 + te.width, 102);
	  ctx.stroke();
	   
	  //console.log('<img src="' + canvas.toDataURL() + '" />');

	  var fs = require('fs')
	    , out = fs.createWriteStream(__dirname + '/wallpaper.png')
	      , stream = canvas.pngStream();
	       
	      stream.on('data', function(chunk){
		        out.write(chunk);
	      });
 
stream.on('end', function(){
	  console.log('saved png');
	linuxWallpaper.set(path,function(err){
		if(err){
			console.log(err);
		} else {
			console.log('it worked?');
		}
	});
});

/*
linuxWallpaper.set(path,function(err){
	if (err){
		console.log(err);
	} else {
		console.log("background changed");
	}
});

*/
module.exports = backburner;
