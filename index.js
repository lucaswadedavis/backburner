var linuxWallpaper = require('linux-wallpaper');
var fs = require('fs');
var Canvas = require('canvas');

var backburner = {};
var path = "./wallpaper.png";
var screen = {width:1366, height: 760};

var Image = Canvas.Image;
var canvas = new Canvas(screen.width,screen.height);
var ctx = canvas.getContext('2d');	   
	ctx.font = '30px Impact';
	ctx.fillText("Backburner!", screen.width/2, screen.height/2);
	ctx.strokeStyle = 'rgba(0,0,0,0.5)';
	   
var out = fs.createWriteStream(__dirname + '/wallpaper.png');
var stream = canvas.pngStream();
	       
stream.on('data', function(chunk){
	 out.write(chunk);
});
 
stream.on('end', function(){
	linuxWallpaper.set(path,function(err){
		if(err){
			console.log(err);
		} else {
			console.log('it worked?');
		}
	});
});


