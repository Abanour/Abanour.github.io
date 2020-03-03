//displays and handles clicks on the playback button.
function PlaybackButton() {

	this.x = 20;
	this.y = 20;
	this.width = 20;
	this.height = 20;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	//Toggles on or off based on loading a music
	this.togglePlaying = () => {
		this.playing = !this.playing;
	}

	//variables for the pulsing effect around the playback button
	this.startVal = 0;
	this.max = 225;
	this.incrementVal = 2.5;
	this.increase = true;

	//Drawing method
	this.draw = function () {

		if (this.playing) {
			rect(this.x, this.y, this.width / 2 - 2, this.height);
			rect(this.x + (this.width / 2 + 2), this.y, this.width / 2 - 2, this.height);
		}
		else {

			//Creating a pulsing colour effect around the play button to alert the user to click the play button
			noFill();

			if(this.increase == true && this.startVal <= this.max){
				this.startVal += this.incrementVal;

				if(this.startVal == this.max){
					this.increase = false;
				}
			} else {
				this.increase = false;
				this.startVal -= this.incrementVal;

				if(this.startVal == 0){
					this.increase = true;
				}
			}

			stroke(0, 255, 0, this.startVal);
			strokeWeight(2);
			ellipse(this.x + this.width - 12, this.y + this.height - 10, 40)

			noStroke();
			fill(255);
			triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);
		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function () {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			if (sound.isPlaying()) {
				sound.pause();
			} else {
				sound.loop();
			}
			this.playing = !this.playing;
			return true;
		}
		return false;
	};
}