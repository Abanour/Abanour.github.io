//container function for the visualisations
function musicMenu() {
	//array to store visualisations
	this.music = [];

	this.holdIndex = 0;

	this.selectedMusic = null;

	//Adds the music into the this.music array
	this.add = (musicData) => {
		this.music.push(musicData);
	};

	//This function gets the key input from controlAndInput function and looks for the correct index in the this.music array
	// Then passes the correct index to createMusic
	this.getMusic = (indexNumber) => {
		this.holdIndex = [indexNumber - 6];
		this.createMusic(this.holdIndex);

		console.log(this.music[this.holdIndex])
		this.selectedMusic = this.music[this.holdIndex];
	}


	//Create music uses a programming technique called asynchronise which uses promises, resolution and rejective techniques.
	this.createMusic = () => {

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				//Music loaded at this point
				this.loadMusic();
				const error = false;
				if (!error) {
					resolve();
				} else {
					reject('Error: Something went wrong');
				}
			}, 500)

		});
	}

	//This function is called in the creation of the music
	this.loadMusic = async () => {
		//Checks whether sound is playing and manages the stop and pause of the visuliser
		if (sound.isPlaying()) {
			sound.stop();
			controls.playbackButton.togglePlaying();
		}
		try {
			//The sound file is fetched and the user presses the button to play the sound
			sound = loadSound('assets/' + this.music[this.holdIndex] + '.mp3');
			defaultMusic = this.music[this.holdIndex];
		} catch (err) {
			console.log(err);
		}
	}
}
