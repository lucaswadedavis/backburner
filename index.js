var linuxWallpaper = require('linux-wallpaper');
var fs = require('fs');
//requires that Cairo be installed
var Canvas = require('canvas');
var Chance = require('chance');
var paper = require('paper');
var mandalaTime = require('./mandala-time.js');

var backburner = {};
var path = __dirname + "/wallpaper.png";
var screen = {width:1366, height: 730};


var Image = Canvas.Image;
var canvas = new Canvas(screen.width,screen.height);
mandalaTime.initPaper(canvas);


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


