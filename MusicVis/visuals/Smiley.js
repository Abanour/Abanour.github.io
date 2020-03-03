/**
 * I made the visualiser to look like a smiley face, including two eyes and a mouth.
 * When the visualiser is paused the eyes are made up of a lot of vectors to make the
 * shape of the eyes look round. When the music is playing the eyes will enlarge and look
 * like rotating hexagons which change colours. The same goes for the mouth also. When
 * paused the mouth just looks like a straight line, but when it is played the mouth opens
 * which looks like an oval shape. For the background there are random movements of circles
 * which are more faded than the main face so that the face does not get distorted.
 */
var song;
var amp;
var button;

var volhistory = [];

function Smiley() {
  this.name = "Smiley";

  amp = new p5.Amplitude();

  this.draw = function () {

    //Uses the the volume and amplitude of the sound being played
    var vol = amp.getLevel();
    var spectrum = fourier.analyze();

    //Pushes the different volume levels to an array
    volhistory.push(vol);
    stroke(255);
    noFill();
    
    //First for loop is used to position the circular shapes at a certain point
    for (var j = 1; j <= 2; j++) {
      push();
      translate(width / 2 + 300 * j - 450, height / 2 - 150);
      beginShape();
      
      //Second for loop used to make vertex lines with random x and y based on volume around the centre point of the circles
      for (var i = 0; i < 260; i++) {
        
        // stroke(random(255) + spectrum[i], random(255), random(255) - spectrum[i]);
        stroke(random(255), random(255), random(255));
        // strokeWeight(vol)

        var r = map(volhistory[i], 0, 1, 10, 40);
        var x = r * cos(i) * 6;
        var y = r * sin(i) * 6;
        vertex(x, y);
      }
      endShape();
      
      //Splicing each level of the volume into an array
      if (volhistory.length > 200) {
        volhistory.splice(0, 1);
      }
      
      ///the mouth of the visualiser also uses the volume to expand and retract
      ellipse(5, 300, 400, vol * 200);
      pop();

    }

    //Making a random background effect behind the visualiser
    for(var i = 1; i < width/200; i++){
      for(var j = 1; j < height/200; j++){

        stroke(255, 255, 255, 50);
        ellipse(random(width), random(height), spectrum[i]/5);

      }
    }

  }

}

