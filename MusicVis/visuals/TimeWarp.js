//Clock drawing inspired by p5.JS and customised heavely
// https://p5js.org/examples/input-clock.html

//draw the waveform to the screen
var cx, cy;
var secondsRadius = null;
var minutesRadius = null;
var hoursRadius = null;

var myPoint = null;

// create a new Amplitude analyzer
analyzer = new p5.Amplitude();

// Patch the input to a volume analyzer
analyzer.setInput(sound);


function TimeWarp() {

	//vis name
	this.name = "TimeWarp";

	
	this.fft = new p5.FFT()

	//Sets up the varaiable for the clock position
	var radius = min(width, height) / 2;
	secondsRadius = radius * 0.71;
	minutesRadius = radius * 0.60;
	hoursRadius = radius * 0.50;
	clockDiameter = radius * 1.7;


	//draw the Default clock to the screen
	this.draw = function () {
		this.backgroundVisuals();
		if (sound.isPlaying() == true) {
			this.warpClock();
		} else {
			this.defaultClock();
		}
		this.innerClockVisual();


	};

	this.defaultClock = () => {
		// Angles for sin() and cos() start at 3 o'clock;
		// subtract HALF_PI to make them start at the top

		var cx = width / 2;
		var cy = height / 2;

		var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
		var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
		var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

		// Draw the hands of the clock
		stroke(255);
		strokeWeight(1);
		line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
		strokeWeight(2);
		line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
		strokeWeight(4);
		line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

		// Draw the minute ticks
		strokeWeight(2);
		beginShape(POINTS);
		for (var a = 0; a < 360; a += 6) {
			var angle = radians(a);
			var x = cx + cos(angle) * secondsRadius;
			var y = cy + sin(angle) * secondsRadius;
			vertex(x, y);
		}
		endShape();
	}

	this.warpClock = () => {

		var spectrum = fourier.analyze();
		var rms = analyzer.getLevel();

		var cx = width / 2;
		var cy = height / 2;

		// Angles for sin() and cos() start at 3 o'clock;
		// subtract HALF_PI to make them start at the top
		var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI + (rms * 2);
		var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI - (rms * 2);

		fill(0)
		ellipse(width / 2, height / 2, secondsRadius + 300)

		// Draw the hands of the clock
		push();

		//Warping hour hand
		myPoint = createVector(width / 2, height / 2);
		stroke(255);
		line(width / 2, height / 2, myPoint.x, myPoint.y);

		//Colour change using the spectrum to measure the volume of the music
		stroke(spectrum, 255 - spectrum, 0);
		strokeWeight(1);
		line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
		strokeWeight(2);
		line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);

		// Draw the minute ticks
		strokeWeight(2);
		beginShape(POINTS);
		for (var a = 0; a < 360; a += 6) {
			var angle = radians(a);
			var x = cx + cos(angle) * secondsRadius;
			var y = cy + sin(angle) * secondsRadius;
			vertex(x, y);

			stroke(0 + spectrum, 255 - spectrum, random(50, 255) - spectrum, 50);

			noFill();
			// Draw an ellipse with size based on volume
			ellipse(x, y, 2 + rms * 50, 2 + rms * 50);
		}
		endShape();


		pop();
	}

	//Complex shape visuals inside the clock face
	this.innerClockVisual = () => {

		//Variable for the complex shape involved in the inner part of the clock
		var angle1 = TWO_PI * noise(0.01 * frameCount + 10);
		var angle2 = TWO_PI * noise(0.01 * frameCount + 20);
		var rx = 50 * noise(0.01 * frameCount + 20);
		var tx = 140 * noise(0.01 * frameCount + 30);
		var size2 = 40 * noise(0.01 * frameCount + 30);

		var spectrum = fourier.analyze();

		fill(0, 50);
		stroke(255, 50);

		push();
		translate(width / 2, height / 2);

		//The motion is computed through the frame count with the angle and indexes of the for loop into consideration.

		//First for loop to make the shapes rotate around a bigger angle
		for (var i = 0; i < 8; i++) {
			push();
			rotate(angle1 + TWO_PI * i / 8);
			translate(tx, 0);

			//second for loop used to rotate around a smaller angle in the bigger angle
			for (var j = 0; j < 4; j++) {
				push();
				rotate(angle2 + TWO_PI * j / 6);
				translate(rx, 0);

				stroke(0 + spectrum[i], random(50, 255) - spectrum[i], 50);

				ellipse(rx, 0, size2, size2);

				pop();
			}
			translate()
			pop();
		}
		pop();

	}

	//Background visuals analying the energy from the sound and being manipulated.
	//The background is not complete; Other shape manipulations will be used to make it more aesthetic
	this.backgroundVisuals = () => {

		var spectrumFFT = this.fft.analyze(sound);

		this.fft.getEnergy(150) //150 is the highest average of most sound


		//Commented code will is code in progress. if i have not use, the code will be deleted. NOT USELESS CODE
		var circleSize = 60;

		
		for (var i = 0; i <= ceil(width / circleSize) + 1; i++) {
			for (var j = 0; j < ceil(height / circleSize) + 1; j++) {
				var circleExp = circleSize + spectrumFFT[i];

				circleExp = map(circleExp, 60, 80, 0, 8)
				
				stroke(spectrumFFT[i] - Math.random(10, 50),
					spectrumFFT[i] - Math.random(10, 50), 50,
					spectrumFFT[i] - Math.random(10, 70));

				ellipse(i * 120 + 30, j * 120 + 20, circleExp, circleExp);
			}

		}
	}
}