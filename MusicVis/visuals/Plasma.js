/**
 * This visualiser came about when I saw a plasma ball. The beauty of electricity
 * moving and reacting to a touch. Although the visualiser does not really grasp
 * the full functionality of a plasma ball, I have tried to keep the important
 * bits of a plasma ball; like the electricity but in the application, there are
 * only 4 lightnings are present. And the line which starts from the centre and
 * ends on the mouse x and y position; which emulates when a hand touches a plasma
 * ball and the electricity targets the hand etc.
 * 
 * IMPROVEMENT:
 * •	In the plasma visual, I wanted to randomly shoot out some lightening from
 * 		the centre and let the lightening have different lengths; in short make it
 * 		look more like a lightening.
 * 
 */
function Plasma() {
	//vis name
	this.name = "Plasma";

	this.analyzer = new p5.Amplitude();

	//draw the Default clock to the screen
	this.draw = function () {

		this.circles();
		this.lineTest();
		this.wavePatten();

	};

	
	//Circle making complex shape whilst the music is playing
	this.count = noise(0.01 * frameCount);
	this.circles = () => {
		
		this.vol = this.analyzer.getLevel();
		
		stroke(random(255), random(255), random(255));

		fill(random(255), random(255), random(255), 50);

		push();

		translate(width / 2, height / 2)
		rotate(this.count++);
		//Shift top right
		ellipse(0 + (this.vol * 200), 0 - (this.vol * 200), 50);

		//shift bottom left
		ellipse(0 - (this.vol * 200), 0 + (this.vol * 200), 50);

		//shift top left
		ellipse(0 - (this.vol * 200), 0 - (this.vol * 200), 50);

		//shift bottom right
		ellipse(0 + (this.vol * 200), 0 + (this.vol * 200), 50);

		pop();

	}

	
	//Lines drawn in the background going anti-clockwise by default
	this.rotation = noise(0.001 * frameCount);
	this.lineTest = () => {

		this.vol2 = this.analyzer.getLevel();

		//Ellipse around the mouse pointer
		ellipse(mouseX + 5, mouseY + 10, 30, 30)

		push();
		
		translate(width / 2, height / 2);

		//The line turns the other way and changes colour if it goes above a certain volume
		strokeWeight(10);
		if((this.vol2 * 100) < 25){
			stroke(255, 0, 0, 90);
			rotate(this.rotation = this.rotation + 300);
			
		} else {
			stroke(0, 0, 255, 90);
			rotate(-(this.rotation = this.rotation + 300));
			
		}
		
		//Translate and rotate used to draw the lines; emulating a lightening shape
		line(0, 0, 100, 100);

			push();

				translate(100, 100);

				rotate(45)

				line(0, 0, 100, 100);

				push();

					translate(100, 100);

					rotate(-45)

					line(0, 0, 100, 100);

				pop();

			pop();

		pop();
	}

	//Wave pattern code taken from the wave pattern class already implemented in the applications
	this.wavePatten = () => {

		//Line drawn from the centre of the visualiser to the mouses x and y position
		if((mouseX < width && mouseX > -width) &&
		mouseY < height && mouseY > -height){
			
			line(width / 2, height / 2, mouseX + 5, mouseY + 10);
			
		}

		push();
		noFill();
		stroke(0, 255, 0, 40);
		strokeWeight(2);

		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++){
			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, 0, width);

			var y = map(wave[i], -1, 1, 0, height);

			vertex(x, y);

		}

		endShape();
		pop();
	}

}
