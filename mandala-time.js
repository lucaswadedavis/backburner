var Chance = require('chance');
var paper = require('paper');
var m = {};

var initBounds=function(){
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  var b={};
  b.right=x-20;
  b.left=0;
  b.top=0;
  b.bottom=y;
  b.centerX=b.right/2;
  b.centerY=b.bottom/2;
  b.width=b.right-b.left;
  b.height=b.bottom-b.top;

  return b;
};

m.drawMandala=function(date){
  var d=new Date();
  var chnc = new Chance(d.toDateString() );
  //var chnc=new Chance();
  paper.project.clear();
  var strokeWidth=1;
  var strokeColor="#fff";
	var circle=function(x,y,r){
		var path = new paper.Path.Circle({
    	//center: paper.view.center,
    	center:[x,y],
    	radius: r,
    	strokeColor:strokeColor,
    	strokeWidth:strokeWidth
    });
		  
	};
	
	var diamond=function(x,y,l,w1,w2){
    var p=new paper.Path;
    p.strokeColor=strokeColor;
    p.strokeWidth=strokeWidth;
    p.add([x,y]);
    p.add([x+(l/2),y-(l/2)]);
    p.add([x+l,y]);
    p.add([x+(l/2),y+(l/2)]);
    p.add([x,y]);
    return p;
	};
	
	var petal=function(x,y,l,w1,w2){
    var p=new paper.Path;
    var w1=w1||2;
    p.add([x+l,y]);
    p.add(new paper.Segment(
      new paper.Point([x,y]),
      new paper.Point([0,-l/w1]),
      new paper.Point([0,l/w1])
      )
    );
    p.add([x+l,y]);
    p.strokeColor=strokeColor;
    p.strokeWidth=strokeWidth;
    return p;
	};

  var orbits=24;
  var r=0;
  var planets=60;
  var theta_interval=360/planets;
  var interval=(Math.min(paper.view.bounds.width,paper.view.bounds.height)-60)/(2*24);
  for (var i=0;i<orbits;i++){
    r+=interval;
    //var planetRadius=chnc.integer({min:2,max:30});
    var planetRadius=chnc.integer({min:Math.max(1,interval/10),max:Math.max(1,interval*2)});
    var w1=chnc.integer({min:Math.max(1,interval/10),max:Math.max(1,interval/2)});
    var ringType=chnc.pick(["petal","petal","circle","diamond"]);
    for (var j=0;j<planets;j++){
      var theta=j*theta_interval;
      var position=geo.getPoint(paper.view.bounds.centerX,paper.view.bounds.centerY,r,theta);
      if (ringType=="circle"){
        circle(position.x2,position.y2,planetRadius);   
      }else if (ringType=="diamond"){
        diamond(
          paper.view.bounds.centerX+r,
          paper.view.bounds.centerY,
          planetRadius,
          w1
          ).rotate(theta,paper.view.center);
        
      }else{
        petal(
          paper.view.bounds.centerX+r,
          paper.view.bounds.centerY,
          planetRadius,
          w1
          ).rotate(theta,paper.view.center);
      }            
    }
  }

	paper.view.draw();
};

m.initPaper=function(){
  var canvas = document.getElementById('paper');
  //var chnc = new Chance();
	paper.setup(canvas);
	m.drawMandala();
	paper.view.onResize=function(event){
	  m.drawMandala();
	  paper.view.draw();
	};
};


module.exports = m;
