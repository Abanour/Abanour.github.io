/**
 * 
 * The basic functionality of this feature is that the volume of the
 * music is controlled whilst the music being played. Initially I
 * was going to control the systems volume but that would be messy,
 * in the sense that the application will not be independent from other
 * applications. What if the user wanted to mute the music visualiser
 * and listen to a YouTube video they were watching; so, the sound
 * volume is manipulated instead of the system volume.
 * 
 */
function volumeControl() {
	//Variable to postion the volume rocker
	this.x = 20;
	this.y = 20;
	this.width = 20;
	this.height = 20;

	//Volume rocker starting value
	this.volumeRocker = 5;

	//maximum value
	this.maxVolume = 15;

	//draw method
	this.draw = function () {

		strokeWeight(1);
		stroke(92, 92, 61);
		noFill();
		
		//Volume control background
		rect(this.x - 2, this.y + 48, this.width + 4, this.height + 29);
		
		this.volumeUp();
		this.volumeDown();
		this.displayVolume();

	}

	//Code to draw the volume up section of the volume rocker
	this.volumeUp = function () {

		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y + 50 && mouseY < this.y + 50 + this.height) {
			fill(77, 77, 51);
		}

		//Volume up
		rect(this.x, this.y + 50, this.width, this.height);

		noStroke();
		fill(255);

		//Positive symbol
		rect(this.x + 9, this.y + 52.2, this.width - 16, this.height - 3);
		rect(this.x + 3, this.y + 59, this.width - 4, this.height - 16);


	}

	//Code to draw the volume down section of the volume rocker
	this.volumeDown = function () {

		noFill();
		stroke(92, 92, 61);

		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y + 75 && mouseY < this.y + 75 + this.height) {
			fill(77, 77, 51);
		}

		//Volume down
		rect(this.x, this.y + 75, this.width, this.height);

		noStroke();
		fill(255);

		//Negative symbool
		rect(this.x + 2.5, this.y + 83, this.width - 4, this.height - 16);



	}

	//This displays the current value of the volume
	this.displayVolume = function () {

		noStroke();
		textSize(15);

		if (this.volumeRocker == this.maxVolume) {
			text("Vol: Max", this.x, this.y + 115);
		} else if (this.volumeRocker == 0) {
			text("Vol: Mute", this.x, this.y + 115);
		} else {
			text("Vol: " + this.volumeRocker, this.x, this.y + 115);
		}
		
	}

	//checks for clicks on the button
	//@returns true if clicked false otherwise.
	this.hitCheck = function () {

		if (mouseX > this.x - 2 && mouseX < this.x + this.width + 4 && mouseY > this.y + 48 && mouseY < this.y + this.height + 77) {

			return true;
		}

		return false;
	};

	this.mousePressed = function () {

		//Volume up
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y + 50 && mouseY < this.y + 50 + this.height) {
			this.volumeRocker = this.volumeRocker + 1;
			if (this.volumeRocker >= this.maxVolume) {
				this.volumeRocker = this.maxVolume;
			}
			this.volumeChange();
		};

		// Volume down
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y + 75 && mouseY < this.y + 75 + this.height) {
			this.volumeRocker = this.volumeRocker - 1;
			if (this.volumeRocker <= 0) {
				this.volumeRocker = 0;
			}
			this.volumeChange();
		};

	};

	// Volume change. 1 is actually 0.1 because changing the volume by -/+1 is too much
	this.volumeChange = async () => {
		try {
			sound.setVolume(this.volumeRocker * 10 ** -1);
		} catch (err) {
			console.log(err);
		}
	};
}
