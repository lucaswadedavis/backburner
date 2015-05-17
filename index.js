var linuxWallpaper = require('linux-wallpaper');
var backburner = {};
var path = "./images/WeAreNotTakingTheWizard.jpg"

linuxWallpaper.set(path,function(err){
	if (err){
		console.log(err);
	} else {
		console.log("background changed");
	}
});


module.exports = backburner;
