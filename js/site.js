// good height is 942.927 (i=80) v=(29.0679, 203.813)@1745.2
// bad height is 1745.2 (i=210) v=(28.8929, 202.604)
var i = 0;
var width, height;
var zScale = -0.25;
var zBase = 300 / zScale;
var xScale = 1;
var xBase = -200;
var powers = [8, 4, 8 / 3, 2];
var powerBase = 5;
var light = true;

//Just dont look in here
const s = (pi) => {
  p = pi;
  pi.setup = function () {
    pi.createCanvas(p.windowWidth, p.windowHeight);
    width = p.windowWidth;
    height = p.windowHeight;
    $("canvas").contextmenu((e) => {
      e.preventDefault();
    });
    p.angleMode(p.DEGREES);
    zBase -= height / zScale;
    zBase += 600 * 4;
  };

  var minVel = 11111110;
  var maxVel = 0;
  for (const vel of vels) {
    minVel = Math.min(vel, minVel);
    maxVel = Math.max(vel, maxVel);
  }
  var minAlt = 11111110;
  var maxAlt = 0;
  for (const alt of alts) {
    minAlt = Math.min(alt, minAlt);
    maxAlt = Math.max(alt, maxAlt);
  }
  var minCd = 11111110;
  var maxCd = 0;
  for (const cd of cds) {
    minCd = Math.min(cd, minCd);
    maxCd = Math.max(cd, maxCd);
  }
  var altMode = false;

  const emaConst = 0.01;

  pi.draw = function () {
    if (light) {
      p.background(255);
      p.strokeWeight(0);
    } else {
      p.fill(255);
      p.background(4 * 16);
    }
    p.textSize(30);
    if (altMode) {
      p.text("Altitude (x) vs Cd (y)", p.width / 2, 100);
    } else {
      p.text("Velocity (x) vs Cd (y)", p.width / 2, 100);
    }
    p.textSize(14);
    p.text("Click to change view mode", p.width / 2, 130);
    p.strokeWeight(3);
    var emaVal = cds[0];
    for (var i = 0; i < vels.length; i++) {
      var xSpot = 0;
      if (!altMode) {
        xSpot = ((vels[i] - minVel) / (maxVel - minVel)) * p.width;
      } else {
        xSpot = ((alts[i] - minAlt) / (maxAlt - minAlt)) * p.width;
      }
      emaVal = emaVal * (1 - emaConst) + emaConst * cds[i];
      const cdSpot = ((cds[i] - minCd) / (maxCd - minCd)) * p.height;
      p.stroke(0);
      p.point(xSpot, p.height - cdSpot);
      const cdSpot2 = ((emaVal - minCd) / (maxCd - minCd)) * p.height;
      p.stroke(255, 0, 0);
      p.point(xSpot, p.height - cdSpot2);
    }
    p.noStroke();
    p.text(
      "Cd: " + minCd,
      p.width - p.textWidth("Cd: " + minCd) - 10,
      p.height - 30,
    );
    p.text("Cd: " + maxCd, p.width - p.textWidth("Cd: " + maxCd) - 10, 20);
    if (altMode) {
      var xSpot = 0;
      p.text("Alt: " + minAlt, 10, p.height - 10);
      p.text(
        "Alt: " + maxAlt,
        p.width - p.textWidth("Alt: " + maxAlt) - 10,
        p.height - 10,
      );
    } else {
      p.text("Vel: " + minVel, 10, p.height - 10);
      p.text(
        "Vel: " + maxVel,
        p.width - p.textWidth("Vel: " + maxVel) - 10,
        p.height - 10,
      );
    }
  };
  pi.mouseDragged = function () {};
  pi.mouseClicked = function () {
    altMode = !altMode;
  };
  pi.mouseReleased = function () {};
};
